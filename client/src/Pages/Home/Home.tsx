import React, { useEffect, useState } from 'react'; // we need this to make JSX compile
import { io } from 'socket.io-client';
import Time from '../../Components/Time/Time';
import styles from './Home.module.scss';


type Props = {socket: any}

const Home = ({ socket }: Props) => {

  const [time, setTime] = useState('fetching')  

  useEffect(() => {
    
    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),5000)
    })
    socket.on('time', (data:any)=>setTime(data))
    socket.on('disconnect',()=>setTime('server disconnected')) 

  },[])

  return (
    <div className={styles.home}>
      <Time time={time}/>
    </div>   
  );
};

export default Home;