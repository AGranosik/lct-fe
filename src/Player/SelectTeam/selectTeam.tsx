import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../../redux/store.tsx";
import { getTeamsAsyncThunk } from "../../redux/team/teamSlice.tsx";
import { selectTeamAsyncThunk } from "../../redux/tournament/tournamentSlice.tsx";
import './selectTeam.scss'

export default function SelectTeam() {
    const {tournamentId, playerId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ selectedTeam, setSelectedTeam ] = useState('');

    const teams = useSelector((state: Store) => {
        return state.teams
    });

    useEffect(() => {
        dispatch(getTeamsAsyncThunk());
    }, [])

    const teamsToSelectList = () => {
        return teams.map((team: string) => {
            return (<div key={team} onClick={() => setSelectedTeam(team)} className={team === selectedTeam ? 'selected team' : 'team'} >{team}</div>)
        })
    } 

    const selectTeam = () => {

        dispatch(selectTeamAsyncThunk({
            playerId: playerId,
            tournamentId: tournamentId,
            team: selectedTeam
        }))
        .then(r => {
            if(r.error){
                console.log('error');
            }
            else{
                navigate(`/management/${tournamentId}`);
            }
        });
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
            {selectedTeam}
        </div>
            )
}