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
        console.log('here')
        return state.teams.map((team: string) => ({ name: team, selected: false }))
    })

    const player = useSelector((state: Store) => {
        return state.player
    })

    useEffect(() => {
        console.log('empty')
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://192.168.1.11:7008/hubs/player')
            .withAutomaticReconnect()
            .build()

        setConnection(newConnection)
    }, [])

    useEffect(() => {
        if (player && player.selectedTeam !== '') { navigate('/player/selected') }
    }, [player])

    useEffect(() => {
        dispatch(getTeamsAsyncThunk())
        console.log(teams)
        if (tournamentId && teams.length) {
            connection?.start()
                .then(result => {
                    connection.on(tournamentId, (model: any) => {
                        console.log(model)
                        console.log(teams)
                        if (model.tournamentId === tournamentId) {
                            if (model.type === 'TeamSelected' && model.playerId !== playerId) {
                                const teamIndex = teams.findIndex((team: TeamModel) => team.name === model.team)
                                console.log(teamIndex)
                                if (teamIndex !== -1) {
                                    console.log('here')
                                    teams[teamIndex].selected = true
                                }
                            }
                        }
                    })
                })
        }
    }, [connection])

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
