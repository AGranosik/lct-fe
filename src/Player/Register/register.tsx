import { ErrorMessage } from '@hookform/error-message'
import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { registerPlayer } from '../../backendConnections/api/Tournament/tournamentApi'
import { PlayerModel } from './Models/PlayerModel'
import { PlayerRegisterModel } from './Models/playerRegisterModel'
import './register.scss'
export default function PlayerRegister () {
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm<PlayerRegisterModel>()
    const navigate = useNavigate()
    const [player, setPlayer] = useState<PlayerModel | null>(null)

    useEffect(() => {
        if (player) { navigate(`/player/select/${id}/${player.name}/${player.surname}`) }
    }, [player])

    const onSubmit: SubmitHandler<PlayerRegisterModel> = async (data: PlayerRegisterModel) => {
        const result = await registerPlayer({ ...data, tournamentId: id as string })
        if (result.status === 200) {
            setPlayer({
                name: data.name,
                surname: data.surname,
                drawnTeam: '',
                selectedTeam: ''
            })
        }
    }

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='input-container name-container'>
                    <TextField error={!!errors.name} fullWidth label="Imie" {...register('name', { required: 'This is ...', maxLength: 50 })} />
                    <div className='error-container'>
                        <ErrorMessage errors={errors} name="name" />
                    </div>
                </div>
                <div className='input-container surname-container'>
                    <TextField error={!!errors.surname} fullWidth label="Nazwisko" {...register('surname', { required: 'This is ...', maxLength: 50 })} />
                    <div className='error-container'>
                        <ErrorMessage errors={errors} name="surname" />
                    </div>
                </div>
                <div className='submit-container'>
                    <Button type="submit" variant="contained">Dołącz</Button>
                </div>
            </form>
        </div>
    )
}
