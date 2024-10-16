import classNames from 'classnames';
import styles from './Button.module.scss';

type Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const Button = ({ text, onClick, disabled, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.button, className)}
      disabled={disabled}
    >
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default Button;
