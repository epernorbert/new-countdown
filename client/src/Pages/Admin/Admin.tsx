import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import styles from './Admin.module.scss';

type Props = {socket: any}

const Admin = ({ socket }: Props) => {

  const [timer, setTimer] = useState("");  
  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('send-timer', timer)
    setTimer("")
  }

  const timerChangeHander: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTimer(e.target.value);    
  }

  return (
    <div className={styles.admin}>
      <h1>This is admin page</h1>
      <form onSubmit={submitHandler} >
        <input placeholder='Timer' onChange={timerChangeHander} value={timer} />
        <button type='submit' value='Send'>Send</button>
      </form>
    </div>   
  );
};

export default Admin;