import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";

type Props = { max: number; value: number };

const ProgressBar = ({ max, value }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newProgress = (value / max) * 100;
    setProgress(newProgress);
  }, [value, max]);

  return (
    <div className={styles.progressBar}>
      <div
        className={styles.value}
        id="progress-bar"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;