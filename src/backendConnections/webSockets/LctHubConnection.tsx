import { HubConnectionBuilder } from '@microsoft/signalr'
import { _baseUrl } from '../_globalVariables'

export const createConnection = (hub: string = 'hubs/player') => {
    return new HubConnectionBuilder()
        .withUrl(`${_baseUrl}/${hub}`)
        .withAutomaticReconnect()
        .build()
}
