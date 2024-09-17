import React, { SyntheticEvent, useEffect, useRef, useState } from "react"; // we need this to make JSX compile
import { useParams } from "react-router-dom";
import Time from "../../Components/Time/Time";
import styles from "./Controller.module.scss";

type Props = { socket: any };

type status = "start" | "stop" | "pause" | "continue";

type Controller = {
  controller_id: number;
  controller_name: string;
};

const Controller = ({ socket }: Props) => {
  const [timer, setTimer] = useState(1);
  const [message, setMessage] = useState("");
  const [currentTime, setCurrentTime] = useState("fetching");
  const timerRef = useRef<any>(null);
  const messageRef = useRef<any>(null);
  const statusRef = useRef<status>("stop");
  const [buttonText, setButtonText] = useState<status>("start");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [controller, setController] = useState([]);
  const [isControllerExist, setIsControllerExist] = useState(false);
  const [error, setError] = useState("");
  const [messageError, setMessageError] = useState("");

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

  const messageSubmitHandler = (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter as HTMLButtonElement;
    const submitValue = submitter?.name;

    if (submitValue === "send-message") {
      if (!error && !messageError) {
        socket.emit("send-message", { message, id });
        setMessage("");
      }
    }
  };

  const submitHandler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const submitValue = e.nativeEvent.submitter?.innerHTML;

    if (submitValue === "send") {
      if (!error && !messageError) {
        statusRef.current = "stop";
        socket.emit("stop-timer", { statusRef, id });
        socket.emit("send-timer", { timer: timer * 60, id });
        setTimer(timer);
        setButtonText("start");
      }
    }

    if (submitValue === "start" || submitValue === "continue") {
      statusRef.current = "start";
      socket.emit("start-timer", { statusRef, id });
      setButtonText("pause");
    }

    if (submitValue === "pause") {
      statusRef.current = "pause";
      socket.emit("pause-timer", { statusRef, id });
      setButtonText("continue");
    }

    if (submitValue === "stop") {
      statusRef.current = "stop";
      socket.emit("stop-timer", { statusRef, id });
      setButtonText("start");
    }
  };

  const timerChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setTimer(timerRef.current?.value);
    if (timerRef.current?.value > 1440) {
      setError("Can not be over 24h");
    } else {
      setError("");
    }
  };

  const messageChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setMessage(e.target.value);

    if (e.target.value.length > 50) {
      setMessageError("Message text can not be over 50 character");
    } else {
      setMessageError("");
    }
  };

  return (
    <div>
      {isLoading && <h2>Loadin...</h2>}

      {!isLoading && isControllerExist && (
        <>
          <h1>Controller page</h1>
          <form className={styles.form} onSubmit={submitHandler}>
            <input
              placeholder="Minutes"
              onChange={timerChangeHandler}
              ref={timerRef}
              value={timer}
              type="number"
            />
            <button type="submit">send</button>
            <button type="submit">{buttonText}</button>
            <button type="submit">stop</button>
          </form>
          <form onSubmit={messageSubmitHandler}>
            <input
              placeholder="Message..."
              onChange={messageChangeHandler}
              value={message}
              ref={messageRef}
            />
            <button type="submit" name="send-message">
              Send Message
            </button>
          </form>
          <Time time={currentTime} />
          {error && error}
          {messageError && messageError}
        </>
      )}
      {!isLoading && !isControllerExist && <h2>404</h2>}
    </div>
  );
};

export default Controller;
