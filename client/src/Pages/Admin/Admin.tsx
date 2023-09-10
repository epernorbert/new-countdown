import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import styles from './Admin.module.scss';

type Props = {socket: any}

const Admin = ({ socket }: Props) => {

  const [timer, setTimer] = useState(60);
  const timerRef = useRef<any>(null);
  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('send-timer', timer * 60)
    // console.log(timer); // console log in any tab
  }

  const timerChangeHander: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTimer(timerRef.current?.value)
  }

  return (
    <div className={styles.admin}>
      <h1>This is admin page</h1>
      <form onSubmit={submitHandler} >
        <input placeholder='Minutes' onChange={timerChangeHander} ref={timerRef} />
        <button type='submit' value='Send'>Send</button>
      </form>
    </div>   
  );
};

export default Admin;