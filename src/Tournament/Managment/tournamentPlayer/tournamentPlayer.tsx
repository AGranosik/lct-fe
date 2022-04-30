import { useSelector } from "react-redux";
import { PlayerModel } from "../../../Player/Register/Models/PlayerModel";
import { Store } from "../../../redux/store";
import './tournamentPlayer.scss';

export default function TournamentPlayer(){
    const players = useSelector((state: Store) => state.tournament.players);



    const playerDisplay = () => {
        return players.map((player: PlayerModel) => 
        <div key={player.name + player.surname} className="row">
            <div className="tournament-player-info">
                {player.name}
            </div>
            <div className="tournament-player-info">
                {player.selectedTeam}
            </div>
            <div className="tournament-player-info">
                {player.drawnTeam}
            </div>
        </div>)
    }

    return(
        <div className="tournament-player-container">
            <div className="tournament-player-table">
                <div className="row tournament-player-table-headers">
                    <div className="header">
                        Gracz
                    </div>
                    <div className="header">
                        Wybrana drużyna
                    </div>
                    <div className="header">
                        Dobrana drużyna
                    </div>
                </div>
                <div className="tournament-player-table-rows">
                    {playerDisplay()}
                </div>
            </div>
        </div>
    )
}