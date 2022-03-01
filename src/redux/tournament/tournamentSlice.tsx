import { createSlice } from "@reduxjs/toolkit";
import { CreateTournamentModel } from "../../Tournament/Create/Models/models";


const initialState: CreateTournamentModel = {
    name: '',
    numberOfPlayers: 0
}

export const tournamentSlice = createSlice({
    name: 'tournament',
    initialState,
    reducers: {
        create: (state: CreateTournamentModel, action : { payload: CreateTournamentModel}) => {
            state.name = action.payload.name;
            state.numberOfPlayers = action.payload.numberOfPlayers;
        },
    }
});

export const { create } = tournamentSlice.actions;

export default tournamentSlice.reducer;