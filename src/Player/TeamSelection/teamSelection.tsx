import { HubConnection } from '@microsoft/signalr'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Store } from '../../redux/store'
import { getTeamsAsyncThunk } from '../../redux/team/teamSlice'
import { TeamModel } from './Models/team'
import './teamSelection.scss'
import { createConnection } from '../../backendConnections/webSockets/LctHubConnection'

export default function SelectTeam () {
    const [connection, setConnection] = useState<HubConnection | null>(null)
    const { tournamentId } = useParams()
    // const { tournamentId, playerName, playerSurname } = useParams()
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const [selectedTeam, setSelectedTeam] = useState('')

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
                        // if (model.tournamentId === tournamentId) {
                        //     if (model.type === 'TeamSelected' && model.playerId !== playerId) {
                        //         dispatch(teamSelected(model.team))
                        //     }
                        // }
                    })
                })
        }
    }, [teams.length])
    useEffect(() => {
        // if (player && player.selectedTeam !== '') { navigate('/player/selected') }
    }, [])

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
            setSelectedTeam(name)
        }
    }

    const selectTeam = () => {
        // if (tournamentId && selectedTeam !== '') {
        //     dispatch(selectTeamAsyncThunk({
        //         // playerName: player.name,
        //         // playerSurname: player.surname,
        //         tournamentId,
        //         team: selectedTeam
        //     }))
        // }
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
