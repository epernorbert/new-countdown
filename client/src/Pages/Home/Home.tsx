import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { v4 as uuidv4 } from "uuid";

type Props = {};

type Controller = {
  controller_id: number;
  controller_name: string;
};

const Home = ({}: Props) => {
  const [room, setRoom] = useState("");
  const [controller, setController] = useState([]);
  const [isControllerExist, setIsControllerExist] = useState(false);
  const [activeController, setActiveController] = useState("");

  const handleCreateRoom = () => {
    const key = uuidv4();
    console.log(key);

    fetch(`http://localhost:5000/create-room/${room}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room: room,
        key: key,
      }),
    })
      .then((response) => response.json())
      .then(() => localStorage.setItem("controller_key", key))
      .then(() => (window.location.href = `${room}/controller`));
  };

  useEffect(() => {
    const controller_key = localStorage.getItem("controller_key");
    if (controller_key !== null) {
      fetch(`http://localhost:5000/active-controller/${controller_key}`)
        .then((response) => response.json())
        .then((data) => setActiveController(data[0].controller_name));
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/controller-list")
      .then((response) => response.json())
      .then((data) => setController(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const res = controller.find(findController);
    typeof res === "object"
      ? setIsControllerExist(true)
      : setIsControllerExist(false);
  }, [room]);

  const findController = (controller: Controller) => {
    return controller.controller_name === room;
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
        <button onClick={handleCreateRoom}>Create room</button>
      </div>
      {room.length === 0 && <p>Start typing...</p>}
      {room.length > 0 && !isControllerExist && (
        <p style={{ color: "green" }}>FREE</p>
      )}
      {isControllerExist && <p style={{ color: "red" }}>TAKEN</p>}
      {activeController && (
        <p>
          Active controller:{" "}
          <a href={`/${activeController}/controller`}>{activeController}</a>
        </p>
      )}
      {!activeController && <p>No active controller</p>}
    </div>
  );
};

export default Home;
