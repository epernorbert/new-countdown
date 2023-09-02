import React, { useEffect, useState } from 'react'; // we need this to make JSX compile
import { io } from 'socket.io-client';
import Time from '../../Components/Time/Time';
import styles from './Home.module.scss';

const Home = () => {

  const [time, setTime] = useState('fetching')  

  useEffect( ()=>{
    const socket = io('http://localhost:5000')
    
    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),5000)
    })
    socket.on('time', (data)=>setTime(data))
    socket.on('disconnect',()=>setTime('server disconnected')) 

  },[])

  return (
    <div className={styles.home}>
      <Time time={time}/>
    </div>   
  );
};

export default Home;