import React, { SyntheticEvent, useEffect, useRef, useState } from "react"; // we need this to make JSX compile
import { useParams } from "react-router-dom";
import Time from "../../Components/Time/Time";

type Props = { socket: any };

type status = "start" | "stop" | "pause";

type Controller = {
  controller_id: number;
  controller_name: string;
};

const Controller = ({ socket }: Props) => {
  const [timer, setTimer] = useState(1);
  const [message, setMessage] = useState("");
  const [currentTime, setCurrentTime] = useState("fetching");
  const timerRef = useRef<any>(null);
  const statusRef = useRef<status>("stop");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [controller, setController] = useState([]);
  const [isControllerExist, setIsControllerExist] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/controller-list")
      .then((response) => response.json())
      .then((data) => setController(data))
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/controller-key/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (localStorage.getItem("controller_key") !== data[0].controller_key) {
          window.location.href = "http://localhost:3000/";
        }
      });
  }, []);

  useEffect(() => {
    if (controller.length > 0) {
      controller.find((item: Controller) => {
        return item.controller_name === id ? setIsControllerExist(true) : "";
      });
    }
  }, [controller]);

  socket.emit("join-room", id);

  useEffect(() => {
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("currentTime", (data: any) => setCurrentTime(data));
    socket.on("disconnect", () => setCurrentTime("server disconnected"));
  }, []);

  const sendMessage = () => {
    socket.emit("send-message", { message, id });
    setMessage("");
  };

  const submitHandler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const submitValue = e.nativeEvent.submitter?.innerHTML;

    if (submitValue === "Send") {
      socket.emit("send-timer", { timer: timer * 60, id });
      setTimer(timer);
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

  return (
    <div>
      {isLoading && <h2>Loadin...</h2>}

      {!isLoading && isControllerExist && (
        <>
          <h1>Controller page</h1>
          <form onSubmit={submitHandler}>
            <input
              placeholder="Minutes"
              onChange={timerChangeHander}
              ref={timerRef}
              value={timer}
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
            value={message}
          />
          <button onClick={sendMessage}>Send Message</button>
          <Time time={currentTime} />
        </>
      )}
      {!isLoading && !isControllerExist && <h2>404</h2>}
    </div>
  );
};

export default Controller;
