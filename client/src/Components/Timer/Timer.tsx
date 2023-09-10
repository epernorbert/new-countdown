import React from 'react'; // we need this to make JSX compile
import styles from './Time.module.scss';

type Props = {
  timeLeft: number,  
}

const Time = ({ timeLeft }: Props) => {

  const convertNumberToTime = (timer: number) => {
    const totalMinutes = Math.floor(timer / 60);

    const seconds = timer % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours + ':' + minutes + ':' + seconds 
  }
  
  return (
    <div>{convertNumberToTime(timeLeft)}</div>
  );
};

export default Time;