import { useSelector } from 'react-redux'
import React from 'react'
import { PlayerModel } from '../../../Player/Register/Models/PlayerModel'
import { Store } from '../../../redux/store'
import PlayerInfoComponent from '../PlayerInfo/playerInfoComponent'

export default function TournamentTableComponent () {
    const players = useSelector((state: Store) => state.tournament.players)

    const displayPlayers = () => {
        return players.map((player: PlayerModel) => (<PlayerInfoComponent key={player.name + player.surname} player={player}></PlayerInfoComponent>))
    }

    return (
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
                    {displayPlayers()}
                </div>
            </div>
        </div>
    )
}
