import './App.css';
import Clock from './components/Clock';
import Todolist from './components/Todolist';

function App() {
  return (
    <div className='app'>
      <Todolist />
      <Clock />
    </div>
  );
}

export default App;
