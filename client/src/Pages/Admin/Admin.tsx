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
    </div>
  );
};

export default Admin;
