import React, { useEffect, useState } from 'react'; // we need this to make JSX compile
import Time from '../../Components/Time/Time';
import Timer from '../../Components/Timer/Timer';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import styles from './Home.module.scss';

type Props = {socket: any}

const Home = ({ socket }: Props) => {
  
  const [currentTime, setCurrentTime] = useState('fetching')  
  const [timer, setTimer] = useState(60);
  const [status, setStatus] = useState('stop')
  const [max, setMax] = useState(60)

  socket.once('start', (status: string) => {    
    setStatus(status)
  })

  socket.once('pause', (status: string) => {    
    setStatus(status)
  })

  socket.once('stop', (status: string) => {    
    setStatus(status)
  })

  useEffect(() => {
    const countdown = setTimeout(decreateTimer, 1000);

    if(status === 'pause'){
      clearTimeout(countdown)
      setTimer(timer)
      return () => {}
    }

    if(status === 'stop'){
      clearTimeout(countdown)
      setTimer(max)
      return () => {}
    }
    
    if(timer === 0){
      clearTimeout(countdown)
      setTimer(0)      
      setStatus('pause')
      return () => {}
    }
    //return () => {clearTimeout(countdown)}
    
  }, [timer, status, max])

  const decreateTimer = () => {
    setTimer(timer => timer - 1);
  }

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
      setMax(timer)
    })

  },[])

  return (
    <div className={styles.home}>
      <Time time={currentTime}/>
      <Timer timeLeft={timer} />
      <ProgressBar max={max} value={timer} />
    </div>   
  );
};

export default Home;