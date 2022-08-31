import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { selectTeamApi, SelectTeamApiModel } from '../../backendConnections/api/Team/teamApi'
import { registerPlayer } from '../../backendConnections/api/Tournament/tournamentApi'
import { PlayerModel } from '../../Player/Register/Models/PlayerModel'
import { PlayerRegisterModel } from '../../Player/Register/Models/playerRegisterModel'

const initialState: PlayerModel = {
    name: '',
    surname: '',
    selectedTeam: '',
    drawnTeam: ''
}

export const registerPlayerAsyncThunk = createAsyncThunk(
    'tournament/player/register',
    async (data: PlayerRegisterModel) => {
        const response = await registerPlayer(data)
        return response.data
    }
)

export const selectTeamAsyncThunk = createAsyncThunk(
    'team/create',
    async (data: SelectTeamApiModel) => {
        const response = await selectTeamApi(data)
        return response.data
    }
)

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerPlayerAsyncThunk.fulfilled, (state: PlayerModel, action) => {
            const { name, surname } = action.meta.arg
            state.name = name
            state.surname = surname
            return state
        })
        builder.addCase(selectTeamAsyncThunk.fulfilled, (state: PlayerModel, action) => {
            const { team } = action.meta.arg
            state.selectedTeam = team
        })
    }
})

export default playerSlice.reducer
