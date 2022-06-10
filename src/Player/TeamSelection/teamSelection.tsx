import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectTeamAsyncThunk } from '../../redux/player/playerSlice'
import { Store } from '../../redux/store'
import { getTeamsAsyncThunk } from '../../redux/team/teamSlice'
import { TeamModel } from './Models/team'
import './teamSelection.scss'

export default function SelectTeam () {
    const [connection, setConnection] = useState<HubConnection | null>(null)
    const { tournamentId, playerId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedTeam, setSelectedTeam] = useState('')

    const teams : TeamModel[] = useSelector((state: Store) => {
        console.log('team selector')
        return state.teams.map((team: string) => ({ name: team, selected: false }))
    })

    const player = useSelector((state: Store) => {
        console.log('player selector')
        return state.player
    })

    useEffect(() => {
        console.log('empty')
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://192.168.1.11:7008/hubs/player')
            .withAutomaticReconnect()
            .build()

        dispatch(getTeamsAsyncThunk())
        setConnection(newConnection)
    }, [])

    useEffect(() => {
        console.log('teams effect')
        if (connection && tournamentId && teams.length) {
            connection?.start()
                .then(result => {
                    connection.on(tournamentId, (model: any) => {
                        console.log('inside connection')
                        console.log(model)
                        console.log(teams)
                        if (model.tournamentId === tournamentId) {
                            if (model.type === 'TeamSelected' && model.playerId !== playerId) {
                                const teamIndex = teams.findIndex((team: TeamModel) => team.name === model.team)
                                console.log(teamIndex)
                                if (teamIndex !== -1) {
                                    teams[teamIndex].selected = true // need to override reference probably
                                    console.log(teams)
                                }
                            }
                        }
                    })
                })
        }
    }, [teams.length])
    useEffect(() => {
        if (player && player.selectedTeam !== '') { navigate('/player/selected') }
    }, [player])

    useEffect(() => {
        console.log('connection effect')
        console.log(teams)
    }, [connection])

    const teamsToSelectList = () => {
        console.log('team select')
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
