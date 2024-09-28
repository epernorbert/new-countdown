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
        <span className={styles.timePart}>{hours}</span>:
        <span className={styles.timePart}>{minutes}</span>:
        <span className={styles.timePart}>{seconds}</span>
      </>
    );
  };

  return (
    <div className={classNames(styles.timer, className)}>
      <span className={styles.timeLeft}>{convertNumberToTime(timeLeft)}</span>
    </div>
  );
};

export default Time;
