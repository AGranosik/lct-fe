import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Store } from '../../redux/store';
import { getTournamentAsyncThunk, addPlayer, selectTeam, drawTeamsAsyncThunk } from '../../redux/tournament/tournamentSlice';
import './tournamentManagement.scss';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { PlayerModel } from '../../Player/Register/Models/PlayerModel';
import Button from '@mui/material/Button';
import TournamentPlayer from './PlayersComponent/playersComponent';

export default function TournamentManagement(){
    
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [available, setAvailable] = useState<boolean>(true);
    const dispatch = useDispatch();
    
    const { id } = useParams();
    const tournament = useSelector((state: Store) => {
        
        return state.tournament
    });
    useEffect(() => {
        if(id){
            const newConnection = new HubConnectionBuilder()
                .withUrl('http://192.168.1.11:7008/hubs/player')
                .withAutomaticReconnect()
                .build();
    
            dispatch(getTournamentAsyncThunk(id));
            setConnection(newConnection);
        }
        setDisabled(tournament.players.length === tournament.playerLimit && tournament.players.every((player: PlayerModel) => player.selectedTeam !== ''));
        console.log(tournament.players);
        console.log(tournament.players.every((p: PlayerModel) => p.selectedTeam !== '' && (p.drawnTeam === '' || !p.drawnTeam)) && tournament.players?.length > 0);
        setAvailable(tournament.players.every((p: PlayerModel) => p.selectedTeam !== '' && (p.drawnTeam === '' || !p.drawnTeam)) && tournament.players?.length > 0);
    }, [tournament.playerLimit]);

    useEffect(() => {
        if (connection && id) {
            connection.start()
                .then(result => {
                    connection.on(id, (player: PlayerModel) => {
                        dispatch(addPlayer(player));
                    });
                    connection.on(`${id}/select`, message => {
                        dispatch(selectTeam({ playerId: message.playerId,  team: message.team}));
                    })
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const drawTeamButton = () => {
        if(available){
            return (<div className='submit-container'>
                    <Button variant="contained" onClick={() => dispatch(drawTeamsAsyncThunk(id ?? ''))} disabled={!disabled}>Dobierz drużyny</Button>
                </div>)
        }
    }

    const playerTable = () => {
        if(tournament.players && tournament.players.length > 0){
            return (<TournamentPlayer></TournamentPlayer>);
        }
    }

    return(
        <div className='tournament'>
            <div className='tournament-header'>
                Zaskanuj kod qr będąc podłączonym do sieci Wifi
            </div>
            <div className='qrCode-container'>
                <img src={`data:image/jpeg;base64,${tournament.qrCode}`} />
            </div>
            {playerTable()}
            {drawTeamButton()}
        </div>
    );
}