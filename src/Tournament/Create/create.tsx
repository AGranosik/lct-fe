import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../redux/store';
import { create } from '../../redux/tournament/tournamentSlice.tsx';
import './create.scss'
import { CreateTournamentModel } from './Models/models';

export default function CreateTournament() {

    const state = useSelector((state: Store) => state.tournament);
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors }} = useForm<CreateTournamentModel>();
    const onSubmit: SubmitHandler<CreateTournamentModel> = (data: CreateTournamentModel) => dispatch(create(data));

        return (
            <div className='tournament-container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='input-container name-container'>
                        <TextField fullWidth label="Nazwa" {...register('name', { required: 'This is ...', maxLength: 50 })} />
                        <ErrorMessage errors={errors} name="name" />
                    </div>
                    <div className='input-container numberOfPlayers-container'>
                        <TextField fullWidth label="Liczba graczy" {...register('numberOfPlayers', { required: true, min: 1, max: {value: 20, message: 'Maksymalna wartość wynosi: 20'}})} />
                        <ErrorMessage errors={errors} name="numberOfPlayers" />
                    </div>
                    <div className='submit-container'>
                        <Button type="submit" variant="contained">Stwórz</Button>
                    </div>
                </form>
            </div>
        );
}

