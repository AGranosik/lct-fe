import { HubConnection } from '@microsoft/signalr'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Store } from '../../redux/store'
import { getTeamsAsyncThunk, teamSelected } from '../../redux/team/teamSlice'
import { TeamModel } from './Models/team'
import './teamSelection.scss'
import { createConnection } from '../../backendConnections/webSockets/LctHubConnection'
import { selectTeamApi } from '../../backendConnections/api/Team/teamApi'
import { isStatusOk } from '../../backendConnections/api/common/apiHelper'

//  calkowicie to ograc websocketem?

export default function SelectTeam () {
    const [connection, setConnection] = useState<HubConnection | null>(null)
    const { tournamentId, playerName, playerSurname } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedTeam, setSelectedTeam] = useState('')
    // const [clickedTeam, setClicked]

    const teams : TeamModel[] = useSelector((state: Store) => {
        return state.teams
    })

    useEffect(() => {
        const newConnection = createConnection()

        if (tournamentId) {
            dispatch(getTeamsAsyncThunk(tournamentId))
        }
        setConnection(newConnection)
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
                            }
                            else if(isTeamClickedByOtherPlayer(model)){

                            }
                        }
                    })
                })
        }
    }, [teams.length])

    const teamsToSelectList = () => {
        return teams.map((team: TeamModel) => {
            let classes = team.name === selectedTeam ? 'selected team ' : 'team '
            classes += team.selected ? 'team-occupied' : ''
            return (<div key={team.name} onClick={() => teamOnClick(team.name)} className={classes}>{team.name}</div>)
        })
    }

    const teamOnClick = (name: string) => {
        const selectedTeamIndex = teams.findIndex((team: TeamModel) => team.selected && team.name === name)
        if (selectedTeamIndex === -1) {
            connection?.send('TeamClicked', {
                groupKey: tournamentId,
                team: name
            })
            setSelectedTeam(name)
        }
    }

    const isTeamSelectedByOtherPlayer = (model: any) => model.type === 'TeamSelected' && model.playerName !== playerName && model.playerSurname !== playerSurname
    const isTeamClickedByOtherPlayer = (model: any) => model.typ === 'TeamClicked' && model.playerName !== playerName && model.playerSurname !== playerSurname

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
