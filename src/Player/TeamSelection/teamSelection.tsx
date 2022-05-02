import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectTeamAsyncThunk } from "../../redux/player/playerSlice";
import { Store } from "../../redux/store";
import { getTeamsAsyncThunk } from "../../redux/team/teamSlice";
import './teamSelection.scss'

export default function SelectTeam() {
    const {tournamentId, playerId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ selectedTeam, setSelectedTeam ] = useState('');

    const teams = useSelector((state: Store) => {
        return state.teams
    });

    const player = useSelector((state: Store) => {
        return state.player;
    });

    useEffect(() => {
        dispatch(getTeamsAsyncThunk());
    }, []);

    useEffect(() => {
        if(player && player.selectedTeam !== '')
            navigate(`/management/${tournamentId}`);
    }, [player])

    const teamsToSelectList = () => {
        return teams.map((team: string) => {
            return (<div key={team} onClick={() => setSelectedTeam(team)} className={team === selectedTeam ? 'selected team' : 'team'} >{team}</div>)
        })
    } 

    const selectTeam = () => {
        if(playerId && tournamentId){

            dispatch(selectTeamAsyncThunk({
                playerId: playerId,
                tournamentId: tournamentId,
                team: selectedTeam
            }));
        }
    }
    return(
        <div className="team-container">
            <div className="title">Wybierz drużynę</div>
            <div className="teams-container">
                {teamsToSelectList()}
            </div>
            <div className="team-select-button">
                <Button onClick={() => selectTeam()}
                    variant="contained">Wybierz</Button>
            </div>
        </div>
            )
}