import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TournamentManagement from './Tournament/Managment/tournamentManagement.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.tsx';
import CreateTournament from './Tournament/Create/create.tsx';
import PlayerRegister from './Player/Register/register.tsx';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateTournament />}/>
        <Route path='/management/:id' element={<TournamentManagement />} />
        <Route path='/player/register/:id' element={<PlayerRegister/>} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
