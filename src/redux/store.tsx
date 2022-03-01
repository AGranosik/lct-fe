import { configureStore } from '@reduxjs/toolkit'
import { CreateTournamentModel } from '../Tournament/Create/Models/models'
import tournamentSlice from './tournament/tournamentSlice.tsx'

export interface Store {
    tournament: CreateTournamentModel
}


export default configureStore({
    reducer: {
        tournament: tournamentSlice
    },
})