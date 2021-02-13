import './App.css';
import { Link } from 'react-router-dom';
import Routes from './routes/Routes';

function App() {
  return (
    <>
      <Routes />
      <div className="App">
        App.js
        <Link to="/home">Button</Link>
        <Link to="/profile">Button</Link>
        <Link to="/signup">Button</Link>
      </div>
    </>
  );
}

export default App;
