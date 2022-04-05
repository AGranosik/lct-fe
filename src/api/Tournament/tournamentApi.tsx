import axios from "axios";
import { CreateTournamentModel, TournamentModel } from "../../Tournament/Create/Models/models";
import { PlayerRegisterModel } from '../../Player/Register/Models/playerRegisterModel.tsx'
import { _registerPlayerUrl } from "../_variables.tsx";
import { _tournamentUrl } from "../_variables.tsx";

export const createTournamentApi = (data: CreateTournamentModel) => {
    return axios.post<string>(`${_tournamentUrl}/create`, data)
}

export const getTournamentApi = (params: string) => {
    return axios.get<TournamentModel>(`${_tournamentUrl}`, {
        params: {
            id: params
        }
    })
}

export const registerPlayer = (data: PlayerRegisterModel) => {
    return axios.post<string>(`${_registerPlayerUrl}`, data);
}