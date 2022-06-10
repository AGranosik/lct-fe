import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectTeamAsyncThunk } from '../../redux/player/playerSlice'
import { Store } from '../../redux/store'
import { getTeamsAsyncThunk, teamSelected } from '../../redux/team/teamSlice'
import { TeamModel } from './Models/team'
import './teamSelection.scss'

export default function SelectTeam () {
    const [connection, setConnection] = useState<HubConnection | null>(null)
    const { tournamentId, playerId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedTeam, setSelectedTeam] = useState('')

    const teams : TeamModel[] = useSelector((state: Store) => {
        return state.teams
    })

    const player = useSelector((state: Store) => {
        return state.player
    })

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://192.168.1.11:7008/hubs/player')
            .withAutomaticReconnect()
            .build()

        dispatch(getTeamsAsyncThunk())
        setConnection(newConnection)
    }, [])

    useEffect(() => {
        if (connection && tournamentId && teams.length) {
            connection?.start()
                .then(result => {
                    connection.on(tournamentId, (model: any) => {
                        if (model.tournamentId === tournamentId) {
                            if (model.type === 'TeamSelected' && model.playerId !== playerId) {
                                dispatch(teamSelected(model.team))
                            }
                        }
                    })
                })
        }
    }, [teams.length])
    useEffect(() => {
        if (player && player.selectedTeam !== '') { navigate('/player/selected') }
    }, [player])

    const teamsToSelectList = () => {
        return teams.map((team: TeamModel) => {
            let classes = team.name === selectedTeam ? 'selected team ' : 'team '
            classes += team.selected ? 'team-occupied' : ''
            return (<div key={team.name} onClick={() => setSelectedTeam(team.name)} className={classes}>{team.name}</div>)
        })
    }

    const selectTeam = () => {
        if (playerId && tournamentId) {
            dispatch(selectTeamAsyncThunk({
                playerId,
                tournamentId,
                team: selectedTeam
            }))
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
