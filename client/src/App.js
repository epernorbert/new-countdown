import React, { useState, useEffect } from 'react';
import {io} from 'socket.io-client'
import Clock from './Components/Clock/Clock';

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
      <Clock clock={time}/>
    </div>
  )
}

export default App;