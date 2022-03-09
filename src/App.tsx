import { Provider } from 'react-redux';
import './App.scss';
import store from './redux/store.tsx';
import CreateTournament from './Tournament/Create/create.tsx';
import TournamentManagement from './Tournament/Managment/tournamentManagement.tsx';

function App() {
  return (
    <Provider store={store}>
      <CreateTournament />
      <TournamentManagement />
    </Provider>
  );
}

export default App;
