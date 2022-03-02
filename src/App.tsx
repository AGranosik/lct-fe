import { Provider } from 'react-redux';
import './App.scss';
import store from './redux/store.tsx';
import CreateTournament from './Tournament/Create/create.tsx';

function App() {
  return (
    <Provider store={store}>
    <CreateTournament />
    </Provider>
  );
}

export default App;
