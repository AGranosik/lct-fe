import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTournamentApi } from "../../api/Tournament/tournamentApi.tsx";
import { createTournamentApi } from "../../api/Tournament/tournamentApi.tsx";
import { CreateTournamentModel, TournamentModel } from "../../Tournament/Create/Models/models";


const initialState: TournamentModel = {
    name: '',
    playerLimit: 0,
    id: '',
    players: [],
}

export const createTournamentAsyncThunk = createAsyncThunk(
    'tournament/create',
    async (data: CreateTournamentModel, thunkAPI) => {
        const response = await createTournamentApi(data);
        return response.data;
    }
)

export const getTournamentAsyncThunk = createAsyncThunk(
    'tournament/get',
    async (data: string, thunkAPI) => {
        const response = await getTournamentApi(data);
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
            return state;
        });
        builder.addCase(getTournamentAsyncThunk.fulfilled, (state: TournamentModel, action) => {
            console.log(action);
        })
    }
});

export default tournamentSlice.reducer;