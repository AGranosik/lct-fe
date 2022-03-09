import axios from "axios";
import { CreateTournamentModel, TournamentModel } from "../../Tournament/Create/Models/models";
import { _tournamentUrl } from "./_variables.tsx";

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