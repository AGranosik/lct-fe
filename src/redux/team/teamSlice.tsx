import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getTeamsApi } from '../../backendConnections/api/Team/teamApi'
import { TeamModel } from '../../Player/TeamSelection/Models/team'

const initialState: TeamModel[] = []

export const getTeamsAsyncThunk = createAsyncThunk(
    'teams/get',
    async (tournamentId: string) => {
        const response = await getTeamsApi(tournamentId)
        return response.data
    }
)

export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        teamSelected: (state: TeamModel[], action: PayloadAction<string>) => {
            const teamIndex = findTeam(action.payload, state)
            if (teamIndex !== -1) {
                state[teamIndex].selected = true
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTeamsAsyncThunk.fulfilled, (state: TeamModel[], action) => {
            state = action.payload
            return state
        })
    }
})

const findTeam = (teamToFind: string, teams: TeamModel[]) => teams.findIndex((team: TeamModel) => team.name === teamToFind)

export default teamsSlice.reducer

export const { teamSelected } = teamsSlice.actions
