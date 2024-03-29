import { configureStore } from '@reduxjs/toolkit'
import { TeamModel } from '../Player/TeamSelection/Models/team'
import { TournamentModel } from '../Tournament/Create/Models/models'
import teamsSlice from './team/teamSlice'
import tournamentSlice from './tournament/tournamentSlice'

export interface Store {
    tournament: TournamentModel,
    teams: TeamModel[]
}

export default configureStore({
    reducer: {
        tournament: tournamentSlice,
        teams: teamsSlice
    }
})
