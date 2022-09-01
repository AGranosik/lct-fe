import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { drawTeamsTournamentApi, getTournamentApi, createTournamentApi } from '../../backendConnections/api/Tournament/tournamentApi'
import { PlayerModel } from '../../Player/Register/Models/PlayerModel'
import { CreateTournamentModel, TournamentModel } from '../../Tournament/Create/Models/models'

const initialState: TournamentModel = {
    tournamentName: '',
    playerLimit: 0,
    id: '',
    players: [],
    qrCode: '',
    name: ''
}

export const drawTeamsAsyncThunk = createAsyncThunk(
    'tournament/drawn',
    async (tournamentId: string) => {
        const response = await drawTeamsTournamentApi(tournamentId)
        return response.data
    }
)

export const createTournamentAsyncThunk = createAsyncThunk(
    'tournament/create',
    async (data: CreateTournamentModel, thunkAPI) => {
        const response = await createTournamentApi(data)
        return response.data
    }
)

export const getTournamentAsyncThunk = createAsyncThunk(
    'tournament/get',
    async (data: string, thunkAPI) => {
        const response = await getTournamentApi(data)
        return response.data
    }
)

export const tournamentSlice = createSlice({
    name: 'tournament',
    initialState,
    reducers: {
        addPlayer: (state: TournamentModel, action: PayloadAction<PlayerModel>) => {
            const addedPlayer = action.payload
            const playerIndex = state.players.findIndex((player: PlayerModel) => player.name === addedPlayer.name && player.surname === addedPlayer.surname)
            if (playerIndex === -1) {
                state.players.push(action.payload)
            }
        },
        selectTeam: (state: TournamentModel, action: PayloadAction<{playerName: string, playerSurname: string, team: string}>) => {
            const { playerName, playerSurname } = action.payload
            const playerIndex = state.players.findIndex((player: PlayerModel) => player.name === playerName && player.surname === playerSurname)
            if (playerIndex !== -1) {
                state.players[playerIndex].selectedTeam = action.payload.team
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTournamentAsyncThunk.fulfilled, (state: TournamentModel, action) => {
            const { name, playerLimit } = action.meta.arg
            state.name = name
            state.playerLimit = playerLimit
            state.id = action.payload
            return state
        })
        builder.addCase(getTournamentAsyncThunk.fulfilled, (state: TournamentModel, action) => {
            const { id, tournamentName, qrCode, players, playerLimit } = action.payload
            state.name = tournamentName
            state.qrCode = qrCode
            state.players = players
            state.id = id
            state.playerLimit = playerLimit
            return state
        })
        builder.addCase(drawTeamsAsyncThunk.fulfilled, (state: TournamentModel, action) => {
            const payload = action.payload
            const tournamentPlayers = state.players
            for (let i = 0; i < payload.length; i++) {
                const drawTeamPlayer = payload[i]
                const playerIndex = tournamentPlayers.findIndex(p => p.name === drawTeamPlayer.name && p.surname === drawTeamPlayer.surname) // player comaprision globally somewhere
                if (playerIndex !== -1) {
                    tournamentPlayers[playerIndex].drawnTeam = drawTeamPlayer.teamName
                }
            }
        })
    }
})

export const { addPlayer, selectTeam } = tournamentSlice.actions

export default tournamentSlice.reducer
