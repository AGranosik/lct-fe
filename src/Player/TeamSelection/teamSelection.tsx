import { HubConnection } from '@microsoft/signalr'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Store } from '../../redux/store'
import { getTeamsAsyncThunk, teamSelected } from '../../redux/team/teamSlice'
import { TeamModel } from './Models/team'
import './teamSelection.scss'
import { createConnectionForTournament } from '../../backendConnections/webSockets/LctHubConnection'
import { selectTeamApi } from '../../backendConnections/api/Team/teamApi'
import { isStatusOk } from '../../backendConnections/api/common/apiHelper'

export default function SelectTeam () {
    const [connection, setConnection] = useState<HubConnection | null>(null)
    const { tournamentId, playerName, playerSurname } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedTeam, setSelectedTeam] = useState('')
    const [clickedTeams, setClickedTeams] = useState([''])

    const teams : TeamModel[] = useSelector((state: Store) => {
        return state.teams
    })

    useEffect(() => {
        if (tournamentId) {
            dispatch(getTeamsAsyncThunk(tournamentId))
            const newConnection = createConnectionForTournament(tournamentId)
            setConnection(newConnection)
        }
    }, [])

    useEffect(() => {
        if (connection && tournamentId && teams.length) {
            connection?.start()
                .then(result => {
                    connection.on(tournamentId, (model: any) => {
                        console.log(model)
                        if (isThisTournament(model.tournamentId)) {
                            if (isTeamSelectedByOtherPlayer(model)) {
                                dispatch(teamSelected(model.team))
                            } else if (isTeamClickedEvent(model.type)) {
                                const clickedTeam = getOtherSelectedTeams(model)
                                console.log(clickedTeam)
                                setClickedTeams(clickedTeam)
                            }
                        }
                    })
                })
        }
    }, [teams.length])

    const teamsToSelectList = () => {
        return teams.map((team: TeamModel) => {
            const isSelectedTeam = team.name === selectedTeam
            let classes = 'team '
            if (team.selected) {
                classes += 'team-occupied '
            } else {
                classes += isSelectedTeam ? 'selected team ' : ''
                classes += clickedTeams.includes(team.name) && !isSelectedTeam ? 'team-clicked' : ''
            }
            return (<div key={team.name} onClick={() => teamOnClick(team.name)} className={classes}>{team.name}</div>)
        })
    }

    const teamOnClick = (name: string) => {
        const selectedTeamIndex = teams.findIndex((team: TeamModel) => team.selected && team.name === name)
        if (selectedTeamIndex === -1) {
            connection?.send('TeamClicked', {
                groupKey: tournamentId,
                team: name,
                name: playerName,
                surname: playerSurname
            })
            setSelectedTeam(name)
        }
    }

    const getOtherSelectedTeams = (model: any) => model.clickedTeams?.filter((ct: any) => ct.name !== playerName && ct.surname !== playerSurname).map((ct: any) => ct.team)

    const isTeamClickedEvent = (type: any) => type === 'TeamClicked'
    const isTeamSelectedByOtherPlayer = (model: any) => model.type === 'TeamSelected' && model.playerName !== playerName && model.playerSurname !== playerSurname

    const isThisTournament = (tId: string) => tId === tournamentId

    const selectTeam = async () => {
        if (tournamentId && selectedTeam !== '') {
            // to jakos lepiej ograc, moze callback na success?
            const result = await selectTeamApi({
                playerName: playerName as string,
                playerSurname: playerSurname as string,
                tournamentId,
                team: selectedTeam
            })
            if (isStatusOk(result.status)) {
                navigate('/player/selected')
            }
        }
    }
    return (
        <div className="team-container">
            <div className="title">Wybierz drużynę</div>
            <div className="teams-container">
                {teamsToSelectList()}
            </div>
            <div className="team-select-button">
                <Button onClick={() => selectTeam()}
                    variant="contained">Wybierz</Button>
            </div>
        </div>
    )
}
