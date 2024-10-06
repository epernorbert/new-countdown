import classNames from "classnames";
import styles from "./Message.module.scss";
import Container from "../Container/Container";

type Props = {
  text: string;
  className?: string;
};

const Message = ({ text, className }: Props) => {
  return (
    <Container>
      <div className={classNames(styles.message, className)}>
        <span className={styles.text}>{text}</span>
      </div>
    </Container>
  );
};

export default Message;
