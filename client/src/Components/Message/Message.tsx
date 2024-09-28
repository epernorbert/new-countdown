import classNames from "classnames";
import styles from "./Message.module.scss";

type Props = {
  text: string;
  className?: string;
};

const Message = ({ text, className }: Props) => {
  return (
    <div className={classNames(styles.message, className)}>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default Message;
