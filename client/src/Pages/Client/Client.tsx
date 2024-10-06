import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Message from "Components/Message/Message";
import ProgressBar from "Components/ProgressBar/ProgressBar";
import Timer from "Components/Timer/Timer";
import styles from "./Client.module.scss";

type Props = { socket: any };

type Controller = {
  controller_id: number;
  controller_name: string;
};

const Client = ({ socket }: Props) => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [controller, setController] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isControllerExist, setIsControllerExist] = useState(false);

  socket.emit("join-room", id);

  useEffect(() => {
    socket.on("message", (data: any) => {
      setMessage(data.message);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("timer", (timer: number) => {
      setTimer(timer);
      setMax(timer);
    });
  }, []);

  const [timer, setTimer] = useState(60);
  const [status, setStatus] = useState("stop");
  const [max, setMax] = useState(60);

  socket.once("start", (status: string) => {
    setStatus(status);
  });

  socket.once("pause", (status: string) => {
    setStatus(status);
  });

  socket.once("stop", (status: string) => {
    setStatus(status);
  });

  useEffect(() => {
    const countdown = setTimeout(decreaseTimer, 1000);

    if (status === "pause") {
      clearTimeout(countdown);
      setTimer(timer);
      return;
    }

    if (status === "stop") {
      clearTimeout(countdown);
      setTimer(max);
      return;
    }

    if (timer === 0) {
      clearTimeout(countdown);
      setTimer(0);
      setStatus("pause");
      return;
    }
  }, [timer, status, max]);

  const decreaseTimer = () => {
    setTimer((timer) => timer - 1);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/controller-list")
      .then((response) => response.json())
      .then((data) => setController(data))
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (controller.length > 0) {
      controller.find((item: Controller) => {
        return item.controller_name === id ? setIsControllerExist(true) : "";
      });
    }
  }, [controller]);

  return (
    <div className={styles.client}>
      {isLoading && <h2>Loadin...</h2>}
      {!isLoading && isControllerExist && (
        <>
          <Timer timeLeft={timer} />
          {message && <Message text={message} />}
          <ProgressBar max={max} value={timer} />
        </>
      )}
      {!isLoading && !isControllerExist && <h2>404</h2>}
    </div>
  );
};

export default Client;
