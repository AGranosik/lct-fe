import { Provider } from 'react-redux';
import './App.scss';
import store from './redux/store';
import CreateTournament from './Tournament/Create/create';
import TournamentManagement from './Tournament/Managment/tournamentManagement';

function App() {
  return (
    <Provider store={store}>
      <CreateTournament />
      <TournamentManagement />
    </Provider>
  );
}

export default App;
