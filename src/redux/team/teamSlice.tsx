import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { selectTeamApi } from "../../api/Team/teamApi.tsx";
import { SelectTeamApiModel } from "../../api/Team/teamApi.tsx";
import { getTeamsApi } from "../../api/Team/teamApi.tsx";

const initialState: string[] = [];

export const getTeamsAsyncThunk = createAsyncThunk(
    'teams/get',
    async () => {
        const response = await getTeamsApi();
        return response.data;
    }
)


export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTeamsAsyncThunk.fulfilled, (state: string[], action) => {
            state = action.payload;
            return state;
        });
    }
})

export default teamsSlice.reducer;