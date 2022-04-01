import { ErrorMessage } from "@hookform/error-message";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { PlayerRegisterModel } from "./Models/playerRegisterModel.tsx";

export default function PlayerRegister(){
    const { register, handleSubmit, formState: { errors }} = useForm<PlayerRegisterModel>(); 
    return(
        <div className="registration-container">
            <div className='input-container name-container'>
                <TextField error={!!errors.name} fullWidth label="Imie" {...register('name', { required: 'This is ...', maxLength: 50 })} />
                <div className='error-container'>
                    <ErrorMessage errors={errors} name="name" />
                </div>
            </div>
            <div className='input-container surname-container'>
                <TextField error={!!errors.surname} fullWidth label="Liczba graczy" {...register('surname', { required: 'This is ...', maxLength: 50 })} />
                <div className='error-container'>
                    <ErrorMessage errors={errors} name="surname" />
                </div>
            </div>
            <div className='submit-container'>
                <Button type="submit" variant="contained">Stwórz</Button>
            </div>

        </div>
    )
}