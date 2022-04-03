import { configureStore } from '@reduxjs/toolkit'
import { PlayerModel } from '../Player/Register/Models/PlayerModel.tsx'
import { TournamentModel } from '../Tournament/Create/Models/models'
import playerSlice from './player/playerSlice.tsx'
import tournamentSlice from './tournament/tournamentSlice.tsx'

export interface Store {
    tournament: TournamentModel,
    player: PlayerModel
}


export default configureStore({
    reducer: {
        tournament: tournamentSlice,
        player: playerSlice
    },
})