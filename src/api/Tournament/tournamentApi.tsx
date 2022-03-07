import axios from "axios";
import { CreateTournamentModel } from "../../Tournament/Create/Models/models";
import { _tournamentUrl } from "./_variables.tsx";

export const createTournamentApi = (data: CreateTournamentModel) => {
    return axios.post<string>(`${_tournamentUrl}/create`, data)
}