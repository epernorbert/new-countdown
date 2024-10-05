import classNames from "classnames";
import styles from "./Timer.module.scss";

type Props = {
  timeLeft: number;
  className?: string;
};

const Time = ({ timeLeft, className }: Props) => {
  const convertNumberToTime = (timer: number) => {
    const totalMinutes = Math.floor(timer / 60);

    const seconds = String(timer % 60).padStart(2, "0");
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");

    return (
      <>
        <div className={styles.timePart}>{hours}</div>
        <span className={styles.colon}>:</span>
        <div className={styles.timePart}>{minutes}</div>
        <span className={styles.colon}>:</span>
        <div className={styles.timePart}>{seconds}</div>
      </>
    );
  };

  return (
    <div className={classNames(styles.timer, className)}>
      <div className={styles.timeLeft}>{convertNumberToTime(timeLeft)}</div>
    </div>
  );
};

export default Time;
