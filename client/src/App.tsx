import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Admin from './Pages/Admin/Admin';

const App = () => {

  return (
    <div className="App">      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App;
