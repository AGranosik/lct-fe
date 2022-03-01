import React, { useState } from 'react'
import './create.css'

export default function CreateTournament() {

    const [name, setName] = useState('');
        
        return (
            <div className='tournament-container'>
                <form onSubmit={() => console.log('hehe')}>
                    <label>Nazwa</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                    <input type="submit" value="Stwórz" />
                </form>
            </div>
        );
}