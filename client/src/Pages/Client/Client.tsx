import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Timer from "../../Components/Timer/Timer";

type Props = { socket: any };

const Client = ({ socket }: Props) => {
  const { id } = useParams();

  socket.emit("join-room", id);

  useEffect(() => {
    socket.on("message", (data: any) => {
      console.log(data.message);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("timer", (timer: number) => {
      console.log(timer); // console log where emited the timer
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

  return (
    <div>
      <div>Client page</div>
      <Timer timeLeft={timer} />
      <ProgressBar max={max} value={timer} />
    </div>
  );
};

export default Client;
