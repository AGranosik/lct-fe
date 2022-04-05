import axios from "axios"
import { _getTeamsUrl } from "../_variables.tsx"

export const getTeamsApi = () => {
    return axios.get<string[]>(`${_getTeamsUrl}`);
}