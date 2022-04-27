import axios from "axios"
import { _getTeamsUrl, _selectTeamUrl } from "../_variables"

export interface SelectTeamApiModel{
    playerId: string;
    tournamentId: string;
    team: string;
}

export const getTeamsApi = () => {
    return axios.get<string[]>(`${_getTeamsUrl}`);
}

export const selectTeamApi = (data: SelectTeamApiModel) => {
    return axios.post(_selectTeamUrl, data);
}