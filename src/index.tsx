import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TournamentManagement from './Tournament/Managment/tournamentManagement.tsx';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/management' element={<TournamentManagement />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
