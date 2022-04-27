import { configureStore } from '@reduxjs/toolkit'
import { PlayerModel } from '../Player/Register/Models/PlayerModel'
import { TournamentModel } from '../Tournament/Create/Models/models'
import playerSlice from './player/playerSlice'
import teamsSlice from './team/teamSlice'
import tournamentSlice from './tournament/tournamentSlice'

export interface Store {
    tournament: TournamentModel,
    player: PlayerModel,
    teams: string[]
}


export default configureStore({
    reducer: {
        tournament: tournamentSlice,
        player: playerSlice,
        teams: teamsSlice,
    },
})