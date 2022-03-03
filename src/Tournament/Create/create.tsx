import { ErrorMessage } from '@hookform/error-message';
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

    console.log(state);
        return (
            <div className='tournament-container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='input-container name-container'>
                        <label>Nazwa</label>
                        <input type="text" {...register('name', { required: 'This is ...', maxLength: 50 })}></input>
                        <ErrorMessage errors={errors} name="name" />
                    </div>
                    <div className='input-container numberOfPlayers-container'>
                        <label>Liczba graczy</label>
                        <input type="text" {...register('numberOfPlayers', { required: true, min: 1, max: {value: 20, message: 'Maksymalna wartość wynosi: 20'}})}></input>
                        <ErrorMessage errors={errors} name="numberOfPlayers" />

                    </div>
                    <div className='submit-container'>
                        <input type="submit" value="Stwórz" />
                    </div>
                </form>
            </div>
        );
}

