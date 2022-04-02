import { PlayerModel } from '../../../Player/Register/Models/PlayerModel.tsx'

export interface CreateTournamentModel {
    name: string,
    playerLimit: number
};

export interface TournamentModel extends CreateTournamentModel{
    id: string;
    players: PlayerModel[];
    qrCode: string;
}