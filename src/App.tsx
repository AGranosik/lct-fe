import { Provider } from 'react-redux';
import './App.css';
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
