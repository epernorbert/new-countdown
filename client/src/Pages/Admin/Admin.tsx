import { SyntheticEvent, useRef, useState } from "react";
import styles from "./Admin.module.scss";

type Props = { socket: any };

const Admin = ({ socket }: Props) => {
  const [timer, setTimer] = useState(60);
  const timerRef = useRef<any>(null);

  const submitHandler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    // console.log(timer); // console log in any tab
    const submitValue = e.nativeEvent.submitter?.innerHTML;

    if (submitValue === "Send") {
      socket.emit("send-timer", timer * 60);
    }

    if (submitValue === "Start") {
      socket.emit("start-timer", "start");
    }

    if (submitValue === "Pause") {
      socket.emit("pause-timer", "pause");
    }

    if (submitValue === "Stop") {
      socket.emit("stop-timer", "stop");
    }
  };

  const timerChangeHander: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTimer(timerRef.current?.value);
  };

  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  return (
    <div className={styles.admin}>
      <h1>This is admin page</h1>
      <form onSubmit={submitHandler}>
        <input
          placeholder="Minutes"
          onChange={timerChangeHander}
          ref={timerRef}
        />
        <button type="submit">Send</button>
        <button type="submit">Start</button>
        <button type="submit">Pause</button>
        <button type="submit">Stop</button>
      </form>

      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <a href={`/${room}`}>Room id: {room}</a>
    </div>
  );
};

export default Admin;
