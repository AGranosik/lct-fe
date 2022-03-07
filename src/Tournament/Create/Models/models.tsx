export interface CreateTournamentModel {
    name: string,
    playerLimit: number
};

export interface TournamentModel extends CreateTournamentModel{
    id: string;
}