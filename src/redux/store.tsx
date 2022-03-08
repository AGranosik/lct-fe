import { configureStore } from '@reduxjs/toolkit'
import { TournamentModel } from '../Tournament/Create/Models/models'
import tournamentSlice from './tournament/tournamentSlice.tsx'

export interface Store {
    tournament: TournamentModel
}


export default configureStore({
    reducer: {
        tournament: tournamentSlice
    },
})