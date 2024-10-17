import classNames from 'classnames';
import styles from './Input.module.scss';
import { forwardRef } from 'react';

type Props = {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string | number;
  type?: 'text' | 'number';
};

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input
      type={props.type}
      ref={ref}
      onChange={props.onChange}
      className={classNames(styles.input, props.className)}
      placeholder={props.placeholder}
      value={props.value}
    />
  );
});

export default Input;
