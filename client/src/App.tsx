import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client'
import './App.css';

const App = () => {

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
    <div className="App">
      {time}
    </div>
  )
}

export default App;
