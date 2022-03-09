import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../redux/store';
import { createTournamentAsyncThunk } from '../../redux/tournament/tournamentSlice.tsx';
import './create.scss'
import { CreateTournamentModel } from './Models/models';
import {useNavigate} from "react-router-dom";

export default function CreateTournament(props) {
    const navigate = useNavigate();
    const tournament = useSelector((state: Store) => state.tournament);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }} = useForm<CreateTournamentModel>();
    const onSubmit: SubmitHandler<CreateTournamentModel> = (data: CreateTournamentModel) => dispatch(createTournamentAsyncThunk(data));
    useEffect(() => {
        if(tournament.id)
            navigate(`/management/${tournament.id}`);
    })
        return (
            <div className='tournament-container'>
                <form onSubmit={handleSubmit(onSubmit)}> 
                    <div className='input-container name-container'>
                        <TextField error={!!errors.name} fullWidth label="Nazwa" {...register('name', { required: 'This is ...', maxLength: 50 })} />
                        <div className='error-container'>
                            <ErrorMessage errors={errors} name="name" />
                        </div>
                    </div>
                    <div className='input-container numberOfPlayers-container'>
                        <TextField error={!!errors.playerLimit} fullWidth label="Liczba graczy" {...register('playerLimit', { required: true, min: 1, max: {value: 20, message: 'Maksymalna wartość wynosi: 20'}})} />
                        <div className='error-container'>
                            <ErrorMessage errors={errors} name="playerLimit" />
                        </div>
                    </div>
                    <div className='submit-container'>
                        <Button type="submit" variant="contained">Stwórz</Button>
                    </div>
                </form>
            </div>
        );
}

