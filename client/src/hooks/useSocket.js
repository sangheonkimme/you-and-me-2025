import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { ToastError } from '../utils/toast';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL);

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket server is open✅');
      setIsConnected(true);
    });

    socket.io.on('error', (error) => {
      console.log(error);
      ToastError(error);
    });

    socket.on('disconnect', () => {
      console.log('socket server is disconnected ❌');
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return { socket, isConnected };
};
