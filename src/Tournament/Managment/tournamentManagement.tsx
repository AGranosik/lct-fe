import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Store } from '../../redux/store';
import { getTournamentAsyncThunk } from '../../redux/tournament/tournamentSlice.tsx';
import './tournamentManagement.scss'

export default function TournamentManagement(){

    const {id} = useParams();
    const tournament = useSelector((state: Store) => state.tournament);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(id);
        dispatch(getTournamentAsyncThunk(id))
    })

    return(

        <div>Managment</div>
    );
}