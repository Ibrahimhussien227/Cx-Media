import { useEffect, useMemo, useState } from "react"
import { io } from "socket.io-client"



const useSocket =(url:string, onConnect?: Function)=> {
  const socket = useMemo(()=> io(url), [url])
  const [isConnected, setIsConnected] = useState(false);

  useEffect(()=> {
    const connectHandler =()=>{
      console.log('socket io is connected')
      setIsConnected(true);
      onConnect && onConnect();
    }
    const disconnectHandler =()=>{
      console.log('socket io is disconnected')
      setIsConnected(false);
    }
    socket.on('connect', connectHandler);
    socket.on('disconnect', disconnectHandler);

    return ()=> {
      socket.off('connect', connectHandler);
      socket.off('disconnect', disconnectHandler);
    }
  }, [socket, onConnect])

  return {socket, isConnected};
}

export default useSocket;