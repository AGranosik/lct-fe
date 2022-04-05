import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTeamsApi } from "../../api/Team/teamApi.tsx";
import { Store } from "../../redux/store.tsx";
import { getTeamsAsyncThunk } from "../../redux/team/teamSlice.tsx";

export default function SelectTeam() {
    const {id} = useParams();
    const dispatch = useDispatch();
    
    const teams = useSelector((state: Store) => state.teams);

    useEffect(() => {
        dispatch(getTeamsAsyncThunk());
    }, [])

    return(
        <div>
            <div>Select</div>
            {teams.length}
        </div>
    )
}