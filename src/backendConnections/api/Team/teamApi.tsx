import axios from 'axios'
import { TeamModel } from '../../../Player/TeamSelection/Models/team'
import { _baseApiUrl } from '../../_globalVariables'

const _getTeamsUrl = `${_baseApiUrl}/team`
const _selectTeamUrl = `${_baseApiUrl}/team/select`

export interface SelectTeamApiModel{
    playerName: string;
    playerSurname: string;
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
