import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";
import Container from "Components/Container/Container";
import classNames from "classnames";

type Props = { max: number; value: number };

const ProgressBar = ({ max, value }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newProgress = (value / max) * 100;
    setProgress(newProgress);
  }, [value, max]);

  return (
    <Container className={styles.container}>
      <div className={styles.progressBar}>
        <div
          className={classNames(
            styles.value,
            progress <= 20 && styles.orange,
            progress <= 5 && styles.red
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </Container>
  );
};

export default ProgressBar;
