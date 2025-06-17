import { useSocket } from '@/src/hooks/useSocket';
import React, { useEffect, useState } from 'react';

const RoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('roomListChange', (roomList) => {
      setRoomList(roomList);
      console.log(roomList);
    });
    return () => {
      socket.off('roomListChange');
    };
  }, []);

  return (
    <div>
      Room List :{' '}
      <ul>
        {roomList?.map((room) => (
          <li key={room}>{room}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;

const List = styled.div``;
