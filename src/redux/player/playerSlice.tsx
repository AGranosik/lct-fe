import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerPlayer } from "../../api/Tournament/tournamentApi";
import { PlayerModel } from "../../Player/Register/Models/PlayerModel";
import { PlayerRegisterModel } from "../../Player/Register/Models/playerRegisterModel";

const initialState: PlayerModel = {
    id: '',
    name: '',
    surname: '',
    selectedTeam: "",
    drawnTeam: ""
}

export const registerPlayerAsyncThunk = createAsyncThunk(
    'tournament/player/register',
    async (data: PlayerRegisterModel) => {
        console.log(data);
        const response = await registerPlayer(data);
        return response.data;
    }
)


export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerPlayerAsyncThunk.fulfilled, (state: PlayerModel, action) => {
            const { name, surname} = action.meta.arg;
            state.name = name;
            state.surname = surname;
            state.id = action.payload;
            return state;
        });
    }
})

export default playerSlice.reducer;