import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TournamentManagement from './Tournament/Managment/tournamentManagement';
import { Provider } from 'react-redux';
import store from './redux/store';
import CreateTournament from './Tournament/Create/create';
import PlayerRegister from './Player/Register/register';
import SelectTeam from './Player/SelectTeam/selectTeam';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateTournament />}/>
        <Route path='/management/:id' element={<TournamentManagement />} />
        <Route path='/player/register/:id' element={<PlayerRegister/>} />
        <Route path='/player/select/:tournamentId/:playerId' element={<SelectTeam/>} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
