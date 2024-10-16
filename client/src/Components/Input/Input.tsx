import classNames from 'classnames';
import styles from './Input.module.scss';

type Props = {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input = ({ placeholder, onChange, className }: Props) => {
  return (
    <input
      onChange={onChange}
      className={classNames(styles.input, className)}
      placeholder={placeholder}
    />
  );
};

export default Input;
