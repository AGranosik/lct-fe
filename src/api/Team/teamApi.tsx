import axios from 'axios'
import { _baseUrl } from '../_globalVariables'

const _getTeamsUrl = `${_baseUrl}/team`
const _selectTeamUrl = `${_baseUrl}/team/select`

export interface SelectTeamApiModel{
    playerId: string;
    tournamentId: string;
    team: string;
}

export const getTeamsApi = () => {
    return axios.get<string[]>(`${_getTeamsUrl}`)
}

export const selectTeamApi = (data: SelectTeamApiModel) => {
    return axios.post(_selectTeamUrl, data)
}
