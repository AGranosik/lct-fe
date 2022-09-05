import { useSelector } from 'react-redux'
import React from 'react'
import { PlayerModel } from '../../../Player/Register/Models/PlayerModel'
import { Store } from '../../../redux/store'
import PlayerInfoComponent from '../PlayerInfo/playerInfoComponent'
import './tournamentTable.scss'

export default function TournamentTableComponent () {
    const players = useSelector((state: Store) => state.tournament.players)

    const displayPlayers = () => {
        return players.map((player: PlayerModel) => (<PlayerInfoComponent key={playerKey(player)} player={player}></PlayerInfoComponent>))
    }

    const playerKey = (player: PlayerModel) => player.name + player.surname

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
