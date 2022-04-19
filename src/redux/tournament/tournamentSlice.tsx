import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { selectTeamApi, SelectTeamApiModel } from "../../api/Team/teamApi.tsx";
import { getTournamentApi } from "../../api/Tournament/tournamentApi.tsx";
import { createTournamentApi } from "../../api/Tournament/tournamentApi.tsx";
import { PlayerModel } from "../../Player/Register/Models/PlayerModel.tsx";
import { CreateTournamentModel, TournamentModel } from "../../Tournament/Create/Models/models";
import { Store } from "../store";


const initialState: TournamentModel = {
        name: '',
        playerLimit: 0,
        id: '',
        players: [],
        qrCode: ''
    
}

export const createTournamentAsyncThunk = createAsyncThunk(
    'tournament/create',
    async (data: CreateTournamentModel, thunkAPI) => {
        const response = await createTournamentApi(data);
        return response.data;
    }
)

export const getTournamentAsyncThunk = createAsyncThunk(
    'tournament/get',
    async (data: string, thunkAPI) => {
        const response = await getTournamentApi(data);
        return response.data;
    }
)

export const selectTeamAsyncThunk = createAsyncThunk(
    'team/create',
    async (data: SelectTeamApiModel) => {
        const response = await selectTeamApi(data);
        return response.data;
    }
)

export const tournamentSlice = createSlice({
    name: 'tournament',
    initialState,
    reducers: {
        addPlayer: (state: TournamentModel, action: PayloadAction<PlayerModel>) => {
            const addedPlayer = action.payload;
            const playerIndex = state.players.findIndex((player: PlayerModel) => player.name === addedPlayer.name && player.surname === addedPlayer.surname);
            if(playerIndex === -1)
                state.players.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTournamentAsyncThunk.fulfilled, (state: TournamentModel, action) => {
            const {name, playerLimit} = action.meta.arg;
            state.name = name
            state.playerLimit = playerLimit
            state.id = action.payload;
            return state;
        });
        builder.addCase(getTournamentAsyncThunk.fulfilled, (state: TournamentModel, action) => {
            const {id, tournamentName, qrCode, players} = action.payload;
            state.name = tournamentName;
            state.qrCode = qrCode;
            state.players = players;
            state.id = id;
            return state;
        });
        builder.addCase(selectTeamAsyncThunk.fulfilled, (state: TournamentModel, action) => {
            console.log('here');
            console.log(state);
            console.log(action);
        });
    }
});

export const { addPlayer } = tournamentSlice.actions;

export default tournamentSlice.reducer;