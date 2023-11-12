import { useEffect, useState } from "react";
import styles from "./Home.module.scss";

type Props = {};

type Controller = {
  controller_id: number;
  controller_name: string;
};

const Home = ({}: Props) => {
  const [room, setRoom] = useState("");
  const [controller, setController] = useState([]);
  const [isControllerExist, setIsControllerExist] = useState(false);

  const handleCreateRoom = () => {
    fetch(`http://localhost:5000/create-room/${room}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room: room,
      }),
    }).then((response) => response.json());
  };

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
        <a href={`${room}/controller`} onClick={handleCreateRoom}>
          Create room
        </a>
      </div>
      {room.length === 0 && <p>Start typing...</p>}
      {room.length > 0 && !isControllerExist && (
        <p style={{ color: "green" }}>FREE</p>
      )}
      {isControllerExist && <p style={{ color: "red" }}>TAKEN</p>}
    </div>
  );
};

export default Home;
