import { ErrorMessage } from "@hookform/error-message";
import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { registerPlayerAsyncThunk } from "../../redux/player/playerSlice.tsx";
import { PlayerRegisterModel } from "./Models/playerRegisterModel.tsx";
import './register.scss'
export default function PlayerRegister(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const { register, handleSubmit, formState: { errors }} = useForm<PlayerRegisterModel>(); 
    const onSubmit: SubmitHandler<PlayerRegisterModel> = (data: PlayerRegisterModel) => dispatch(registerPlayerAsyncThunk({...data, tournamentId: id}));
    return(
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