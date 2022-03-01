import React, { useState } from 'react'
import './create.css'

export default function CreateTournament() {

    const [name, setName] = useState('');
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('hehehehe');
    }
        return (
            <div className='tournament-container'>
                <form onSubmit={handleSubmit}>
                    <label>Nazwa</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                    <label>Nazwa</label>
                    <input type="text" value={numberOfPlayers} onChange={(e) => setNumberOfPlayers(e.target.value)}></input>
                    <input type="submit" value="Stwórz" />
                </form>
            </div>
        );
}

