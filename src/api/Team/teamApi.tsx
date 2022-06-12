import axios from 'axios'
import { TeamModel } from '../../Player/TeamSelection/Models/team'
import { _baseUrl } from '../_globalVariables'

const _getTeamsUrl = `${_baseUrl}/team`
const _selectTeamUrl = `${_baseUrl}/team/select`

export interface SelectTeamApiModel{
    playerId: string;
    tournamentId: string;
    team: string;
}

export const getTeamsApi = (tournamentId: string) => {
    return axios.get<TeamModel[]>(`${_getTeamsUrl}`, {
        params: {
            tournamentId
        }
    })
}

export const selectTeamApi = (data: SelectTeamApiModel) => {
    return axios.post(_selectTeamUrl, data)
}
