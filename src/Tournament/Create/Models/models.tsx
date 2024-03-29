import { PlayerModel } from '../../../Player/Register/Models/PlayerModel'

export interface CreateTournamentModel {
    name: string,
    playerLimit: number
};

export interface TournamentModel extends CreateTournamentModel{
    id: string;
    players: PlayerModel[];
    qrCode: string;
    tournamentName: string;
}

export interface DrawTeamModel{
    name: string;
    surname: string;
    teamName: string;
}