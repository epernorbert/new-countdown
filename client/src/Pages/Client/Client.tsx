import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Timer from "../../Components/Timer/Timer";

type Props = { socket: any };

type Controller = {
  controller_id: number;
  controller_name: string;
};

const Client = ({ socket }: Props) => {
  const [message, setMessage] = useState();
  const { id } = useParams();
  const [controller, setController] = useState([]);
  const [exist, setExist] = useState(false);

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
    const countdown = setTimeout(decreateTimer, 1000);

    if (status === "pause") {
      clearTimeout(countdown);
      setTimer(timer);
      return () => {};
    }

    if (status === "stop") {
      clearTimeout(countdown);
      setTimer(max);
      return () => {};
    }

    if (timer === 0) {
      clearTimeout(countdown);
      setTimer(0);
      setStatus("pause");
      return () => {};
    }
    //return () => {clearTimeout(countdown)}
  }, [timer, status, max]);

  const decreateTimer = () => {
    setTimer((timer) => timer - 1);
  };

  useEffect(() => {
    fetch("http://localhost:5000/controller-list")
      .then((response) => response.json())
      .then((data) => setController(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    controller?.map((controller: Controller) => {
      if (id === controller.controller_name) {
        setExist(true);
      }
    });
  }, [controller]);

  return (
    <div>
      {exist ? (
        <div>
          <div>Client page</div>
          <Timer timeLeft={timer} />
          <ProgressBar max={max} value={timer} />
          {message && <div>{message}</div>}
        </div>
      ) : (
        <h1>404</h1>
      )}
    </div>
  );
};

export default Client;
