import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Client from "./Pages/Client/Client";
import { io } from "socket.io-client";
import Controller from "./Pages/Controller/Controller";

const socket = io("http://localhost:5000"); // server port

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/:id" element={<Client socket={socket} />} />
        <Route
          path="/:id/controller"
          element={<Controller socket={socket} />}
        />
      </Routes>
    </div>
  );
};

export default App;
