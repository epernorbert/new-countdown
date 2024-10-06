import styles from './Time.module.scss';

type Props = {
  time: string,  
}

const Time = ({ time }: Props) => {
  return (
    <div className={styles.time}>{time}</div>
  );
};

export default Time;