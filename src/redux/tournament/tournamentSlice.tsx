import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createTournamentApi } from "../../api/Tournament/tournamentApi.tsx";
import { CreateTournamentModel, TournamentModel } from "../../Tournament/Create/Models/models";


const initialState: TournamentModel = {
    name: '',
    playerLimit: 0,
    id: ''
}

export const createTournamentAsyncThunk = createAsyncThunk(
    'tournament/create',
    async (data: CreateTournamentModel, thunkAPI) => {
        const response = await createTournamentApi(data);
        return response.data;
    }
)

export const tournamentSlice = createSlice({
    name: 'tournament',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createTournamentAsyncThunk.fulfilled, (state: TournamentModel, action) => {
            const {name, playerLimit} = action.meta.arg;
            state.name = name
            state.playerLimit = playerLimit
            state.id = action.payload;
        })
    }
});

export default tournamentSlice.reducer;