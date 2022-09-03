import React from 'react'
import { PlayerModel } from '../../../Player/Register/Models/PlayerModel'
import './playerInfoComponent.scss'

export default function PlayerInfoComponent (props: {player: PlayerModel}) {
    const player = props.player
    return (
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
        </div>
    )
}
