import { useState } from "react";
import styles from "./Home.module.scss";

type Props = {};

const Home = ({}: Props) => {
  const [room, setRoom] = useState("");

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
        <a href={`${room}/controller`}>Create room</a>
      </div>
    </div>
  );
};

export default Home;
