import { log } from 'console';
import React, { useEffect, useState } from 'react'; // we need this to make JSX compile
import { io } from 'socket.io-client';
import Time from '../../Components/Time/Time';
import Timer from '../../Components/Timer/Timer';
import styles from './Home.module.scss';


type Props = {socket: any}


const Home = ({ socket }: Props) => {
  
  const [currentTime, setCurrentTime] = useState('fetching')  
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    
    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),5000)
    })
    socket.on('currentTime', (data:any)=>setCurrentTime(data))
    socket.on('disconnect',()=>setCurrentTime('server disconnected')) 

    socket.on('timer', (timer: number) => {
      console.log(timer); // console log where emited the timer
      setTimer(timer)
    })

  },[])

  return (
    <div className={styles.home}>
      <Time time={currentTime}/>
      <Timer timeLeft={timer} />
    </div>   
  );
};

export default Home;