import React, { SyntheticEvent, useEffect, useRef, useState } from "react"; // we need this to make JSX compile
import { useParams } from "react-router-dom";
import Time from "../../Components/Time/Time";

type Props = { socket: any };

type status = "start" | "stop" | "pause";

const Controller = ({ socket }: Props) => {
  const [timer, setTimer] = useState(60);
  const timerRef = useRef<any>(null);
  const [message, setMessage] = useState("");
  const statusRef = useRef<status>("stop");
  const [currentTime, setCurrentTime] = useState("fetching");

  const { id } = useParams();

  socket.emit("join-room", id);

  const sendMessage = () => {
    socket.emit("send-message", { message, id });
  };

  const submitHandler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const submitValue = e.nativeEvent.submitter?.innerHTML;

    if (submitValue === "Send") {
      socket.emit("send-timer", { timer: timer * 60, id });
    }

    if (submitValue === "Start") {
      statusRef.current = "start";
      socket.emit("start-timer", { statusRef, id });
    }

    if (submitValue === "Pause") {
      statusRef.current = "pause";
      socket.emit("pause-timer", { statusRef, id });
    }

    if (submitValue === "Stop") {
      statusRef.current = "stop";
      socket.emit("stop-timer", { statusRef, id });
    }
  };

  const timerChangeHander: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTimer(timerRef.current?.value);
  };

  useEffect(() => {
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("currentTime", (data: any) => setCurrentTime(data));
    socket.on("disconnect", () => setCurrentTime("server disconnected"));
  }, []);

  return (
    <div>
      <h1>Controller page</h1>
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
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <Time time={currentTime} />
    </div>
  );
};

export default Controller;
