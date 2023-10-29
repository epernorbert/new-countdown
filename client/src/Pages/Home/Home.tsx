import { useState } from "react";
import styles from "./Home.module.scss";

type Props = {};

const Home = ({}: Props) => {
  const [room, setRoom] = useState("");

  const handleCreateRoom = () => {
    fetch(`http://localhost:5000/create-room/${room}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room: room,
      }),
    }).then((response) => response.json());
  };

  return (
    <div className={styles.home}>
      <div>Home page</div>
      <input
        placeholder="Room name"
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      ></input>
      <div>
        <span>Create room:</span>
        <a href={`${room}/controller`} onClick={handleCreateRoom}>
          Create room
        </a>
      </div>
    </div>
  );
};

export default Home;
