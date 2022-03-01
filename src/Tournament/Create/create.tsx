import { ErrorMessage } from '@hookform/error-message';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import './create.css'

interface Inputs {
    name: string,
    numberOfPLayers: number
}


export default function CreateTournament() {

    const { register, handleSubmit, watch, formState: { errors }} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    console.log(watch('numberOfPLayers'), errors);

        return (
            <div className='tournament-container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Nazwa</label>
                    <input type="text" {...register('name', { required: 'This is ...', maxLength: 50 })}></input>
                    <ErrorMessage errors={errors} name="name" />
                    <label>Liczba graczy</label>
                    <input type="text" {...register('numberOfPLayers', { required: true, min: 1, max: {value: 20, message: 'Maksymalna wartość wynosi: 20'}})}></input>
                    <ErrorMessage errors={errors} name="numberOfPLayers" />

                    <input type="submit" value="Stwórz" />
                </form>
            </div>
        );
}

