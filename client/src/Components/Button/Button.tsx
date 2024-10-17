import classNames from 'classnames';
import styles from './Button.module.scss';
import { status } from 'Components/Types/types';

type Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'submit';
  name?: status;
};

const Button = ({ text, onClick, disabled, className, type, name }: Props) => {
  return (
    <button
      name={name}
      type={type}
      onClick={onClick}
      className={classNames(styles.button, className)}
      disabled={disabled}
    >
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default Button;
