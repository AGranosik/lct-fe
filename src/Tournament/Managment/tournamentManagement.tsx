import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Store } from '../../redux/store';
import { getTournamentAsyncThunk } from '../../redux/tournament/tournamentSlice.tsx';
import './tournamentManagement.scss'

export default function TournamentManagement(){

    const {id} = useParams();
    const tournament = useSelector((state: Store) => {
        console.log(state);
        console.log('hehere')
        return state.tournament
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTournamentAsyncThunk(id));
    }, [])

    return(
        <div>
            <div className='qrCode-container'>
                <img src={`data:image/jpeg;base64,${tournament.qrCode}`} />
            </div>
            <div>Managment</div>
        </div>
    );
}