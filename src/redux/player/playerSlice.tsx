import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { selectTeamApi, SelectTeamApiModel } from '../../backendConnections/api/Team/teamApi'
import { PlayerModel } from '../../Player/Register/Models/PlayerModel'

const initialState: PlayerModel = {
    name: '',
    surname: '',
    selectedTeam: '',
    drawnTeam: ''
}

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
        builder.addCase(selectTeamAsyncThunk.fulfilled, (state: PlayerModel, action) => {
            const { team } = action.meta.arg
            state.selectedTeam = team
        })
    }
})

export default playerSlice.reducer
