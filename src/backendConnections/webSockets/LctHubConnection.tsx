import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr'
import { _baseUrl } from '../_globalVariables'

export const createConnection = (hub: string = 'hubs/actions') => {
    return new HubConnectionBuilder()
        .withUrl(`${_baseUrl}/${hub}`, {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build()
}
