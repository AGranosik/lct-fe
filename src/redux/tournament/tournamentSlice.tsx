import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createTournamentApi } from "../../api/Tournament/tournamentApi.tsx";
import { CreateTournamentModel } from "../../Tournament/Create/Models/models";


const initialState: CreateTournamentModel = {
    name: '',
    numberOfPlayers: 0
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
        create: (state: CreateTournamentModel, action : { payload: CreateTournamentModel}) => {
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createTournamentAsyncThunk.fulfilled, (state: CreateTournamentModel, action) => {
            state.name = action.meta.arg.name;
            state.numberOfPlayers = action.meta.arg.numberOfPlayers;
        })
    }
});

export const { create } = tournamentSlice.actions;

export default tournamentSlice.reducer;