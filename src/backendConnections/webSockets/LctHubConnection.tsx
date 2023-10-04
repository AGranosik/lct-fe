import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr'
import { _baseUrl } from '../_globalVariables'

export const createConnection = (params: Map<string, string> = new Map<string, string>(), hub: string = 'hubs/actions') => {
    return new HubConnectionBuilder()
        .withUrl(createWebsocketUrl(hub, params), {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build()
}

export const createConnectionForTournament = (tournamentId: string) => {
    const params = new Map<string, string>()
    params.set('tournamentId', tournamentId)
    return createConnection(params)
}

const createWebsocketUrl = (hub: string, params: Map<string, string>) => {
    const searchParams = new URLSearchParams()
    for (const [key, value] of params.entries()) {
        searchParams.append(key, value)
    }

    return `${_baseUrl}/${hub}?${searchParams.toString()}`
}
