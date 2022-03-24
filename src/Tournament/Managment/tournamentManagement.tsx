import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Store } from '../../redux/store';
import { getTournamentAsyncThunk } from '../../redux/tournament/tournamentSlice.tsx';
import './tournamentManagement.scss';
import { HubConnectionBuilder } from '@microsoft/signalr';

export default function TournamentManagement(){

    const [connection, setConnection] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7008/hubs/player')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
        dispatch(getTournamentAsyncThunk(id));
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
    
                    connection.on('Test', message => {
                        alert(message);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const {id} = useParams();
    const tournament = useSelector((state: Store) => {
        return state.tournament
    });

    return(
        <div>
            <div className='qrCode-container'>
                <img src={`data:image/jpeg;base64,${tournament.qrCode}`} />
            </div>
            <div>Managment</div>
            <button onClick={() => connection.send('Test', 'fiu fiu')}>Button</button>
        </div>
    );
}