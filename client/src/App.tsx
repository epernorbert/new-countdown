import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Admin from './Pages/Admin/Admin';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // server port

const App = () => {

  return (
    <div className="App">      
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/admin" element={<Admin socket={socket} />} />
      </Routes>
    </div>
  )
}

export default App;