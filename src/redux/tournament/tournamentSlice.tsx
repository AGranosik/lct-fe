import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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

            const response = axios.post<string>('https://localhost:7008/api/tournament/create', action.payload)
            .then((response) => {
                state.name = action.payload.name;
                state.numberOfPlayers = action.payload.numberOfPlayers;
                console.log(response);
            })
        },
    }
});

export const { create } = tournamentSlice.actions;

export default tournamentSlice.reducer;