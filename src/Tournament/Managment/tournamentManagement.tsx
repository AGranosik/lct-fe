import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Store } from '../../redux/store'
import { getTournamentAsyncThunk, drawTeamsAsyncThunk, addPlayer, selectTeam } from '../../redux/tournament/tournamentSlice'
import './tournamentManagement.scss'
import { HubConnection } from '@microsoft/signalr'
import { PlayerModel } from '../../Player/Register/Models/PlayerModel'
import Button from '@mui/material/Button'
import { createConnection } from '../../backendConnections/webSockets/LctHubConnection'
import TournamentTableComponent from './TournamentTable/tournamentTable'

export default function TournamentManagement () {
    const [connection, setConnection] = useState<HubConnection | null>(null)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [available, setAvailable] = useState<boolean>(true)
    const dispatch = useDispatch()

    const { id } = useParams()
    const tournament = useSelector((state: Store) => {
        return state.tournament
    })
    useEffect(() => {
        if (id) {
            const newConnection = createConnection()

            dispatch(getTournamentAsyncThunk(id))
            setConnection(newConnection)
        }
    }, [tournament.playerLimit])

    useEffect(() => {
        setDisabled(tournament.players.length === tournament.playerLimit && tournament.players.every((player: PlayerModel) => player.selectedTeam !== ''))
        setAvailable(tournament.players.every((p: PlayerModel) => p.selectedTeam !== '' && (p.drawnTeam === '' || !p.drawnTeam)) && anyPlayer())
    }, [tournament.players])

    const anyPlayer = () => tournament.players?.length > 0

    useEffect(() => {
        if (connection && id) {
            connection.start()
                .then(result => {
                    connection.on(id, (model: any) => {
                        if (isThisTournament(model.tournamentId)) {
                            if (model.type === 'PlayerAssigned') {
                                dispatch(addPlayer({
                                    name: model.name, surname: model.surname
                                } as PlayerModel))
                            } else if (model.type === 'TeamSelected') {
                                dispatch(selectTeam({ playerName: model.playerName, playerSurname: model.playerSurname, team: model.team }))
                            }
                        }
                    })
                })
                .catch(e => console.log('Connection failed: ', e))
        }
    }, [connection])

    const isThisTournament = (tournamentId: string) => {
        return id === tournamentId
    }

    const displayTournamentTable = () => {
        if (tournament && tournament.players.length) {
            return <TournamentTableComponent></TournamentTableComponent>
        }
    }

    const drawTeamButton = () => {
        if (available) {
            return (<div className='submit-container'>
                <Button variant="contained" onClick={() => dispatch(drawTeamsAsyncThunk(id ?? ''))} disabled={!disabled}>Dobierz drużyny</Button>
            </div>)
        }
    }

    return (
        <div className='tournament'>
            <div className='tournament-header'>
                Zaskanuj kod qr będąc podłączonym do sieci Wifi
            </div>
            <div className='qrCode-container'>
                <img src={`data:image/jpeg;base64,${tournament.qrCode}`} />
            </div>
            {displayTournamentTable()}
            {drawTeamButton()}
        </div>
    )
}
