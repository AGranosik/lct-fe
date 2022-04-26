import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Store } from '../../redux/store';
import { getTournamentAsyncThunk } from '../../redux/tournament/tournamentSlice.tsx';
import './tournamentManagement.scss';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { addPlayer, selectTeam } from '../../redux/tournament/tournamentSlice.tsx';
import { PlayerModel } from '../../Player/Register/Models/PlayerModel.tsx';
import Button from '@mui/material/Button';
import { drawTeamsAsyncThunk } from '../../redux/tournament/tournamentSlice.tsx';

export default function TournamentManagement(){
    
    const [connection, setConnection] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();
    
    const {id} = useParams();
    let players = [];
    const tournament = useSelector((state: Store) => {
        players = state.tournament.players.map((player: PlayerModel) => <div key={player.name + player.surname}>{player.name} - {player.selectedTeam} - {player.drawnTeam}</div>)
        return state.tournament
    });
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://192.168.1.11:7008/hubs/player')
            .withAutomaticReconnect()
            .build();

        dispatch(getTournamentAsyncThunk(id));
        setConnection(newConnection);

        setDisabled(tournament.players.length === tournament.playerLimit && tournament.players.every((player: PlayerModel) => player.selectedTeam !== ''));
    }, [tournament.playerLimit]);

    useEffect(() => {
        if (connection) {
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


    return(
        <div>
            <div className='qrCode-container'>
                <img src={`data:image/jpeg;base64,${tournament.qrCode}`} />
            </div>
            <div>Managment</div>
            {players}
            <div className='submit-container'>
                {disabled.toString()}
                <Button variant="contained" onClick={() => dispatch(drawTeamsAsyncThunk(id))} disabled={!disabled}>Dobierz drużyny</Button>
            </div>
        </div>
    );
}