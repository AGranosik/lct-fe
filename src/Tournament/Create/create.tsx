import { ErrorMessage } from '@hookform/error-message';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Store } from '../../redux/store';
import './create.css'
import { CreateTournamentModel } from './Models/models';

export default function CreateTournament() {

    const { register, handleSubmit, watch, formState: { errors }} = useForm<CreateTournamentModel>();
    const onSubmit: SubmitHandler<CreateTournamentModel> = data => console.log(data);
    const state = useSelector((state: Store) => state.tournament);

    console.log(state);
        return (
            <div className='tournament-container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Nazwa</label>
                    <input type="text" {...register('name', { required: 'This is ...', maxLength: 50 })}></input>
                    <ErrorMessage errors={errors} name="name" />
                    <label>Liczba graczy</label>
                    <input type="text" {...register('numberOfPlayers', { required: true, min: 1, max: {value: 20, message: 'Maksymalna wartość wynosi: 20'}})}></input>
                    <ErrorMessage errors={errors} name="numberOfPLayers" />

                    <input type="submit" value="Stwórz" />
                </form>
            </div>
        );
}

