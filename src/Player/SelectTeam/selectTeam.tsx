import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Store } from "../../redux/store.tsx";
import { getTeamsAsyncThunk } from "../../redux/team/teamSlice.tsx";
import './selectTeam.scss'

export default function SelectTeam() {
    const {id} = useParams();
    const dispatch = useDispatch();
    
    const teams = useSelector((state: Store) => state.teams);

    useEffect(() => {
        dispatch(getTeamsAsyncThunk());
    }, [])

    const selectTeam = () => {
        return teams.map((team: string) => {
            return (<div key={team} className="team">{team}</div>)
        })
    } 
    return(
        <div className="team-container">
            <div className="title">Wybierz drużynę</div>
            <div className="teams-container">
                {selectTeam()}
            </div>
            <div className="team-select-button">
                <Button variant="contained">Wybierz</Button>
            </div>
        </div>
    )
}