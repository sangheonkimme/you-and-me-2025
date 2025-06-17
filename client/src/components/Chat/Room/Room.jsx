import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '@/src/hooks/useSocket';
import { useDispatch, useSelector } from 'react-redux';
import { saveCountPeople } from '@/src/reduxStore/room/roomSlice';

const Room = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageInputRef = useRef();
  const messageListContainerRef = useRef();
  const roomName = useSelector((state) => state.room.roomname);
  const nickname = useSelector((state) => state.room.nickname);
  const totalPeopleNum = useSelector((state) => state.room.totalPeopleNum);
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('enterRoom', (message, countPeople) => {
      setMessageList((prev) => [...prev, message]);
      dispatch(saveCountPeople(countPeople));
    });

    socket.on('leftRoom', (message, countPeople) => {
      setMessageList((prev) => [...prev, message]);
      dispatch(saveCountPeople(countPeople));
    });

    socket.on('newMessage', (message) => {
      setMessageList((prev) => [...prev, message]);
    });

    return () => {
      socket.off('enterRoom');
      socket.off('leftRoom');
      socket.off('newMessage');
    };
  }, []);

  useEffect(() => {
    messageListContainerRef.current.scrollTop =
      messageListContainerRef.current.scrollHeight;
  }, [messageList]);

  useEffect(() => {
    messageInputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== '') {
      socket.emit('newMessage', message, roomName, () => {
        setMessageList((prev) => [
          ...prev,
          { type: 'message', nickname: nickname.value, message },
        ]);
        setMessage('');
      });
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <h2 className='flex justify-between px-6 pt-6 pb-4 text-xl font-bold bg-white shadow-sm'>
        <span>Chatting Room : {roomName}</span>
        <span>{totalPeopleNum}</span>
      </h2>
      <div
        className='h-full px-4 py-3 overflow-hidden overflow-y-auto scrollbar-none'
        ref={messageListContainerRef}
      >
        <div className='space-y-3'>
          {messageList?.map((item, index) => {
            const isMyMessage = item.nickname === nickname.value;
            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isMyMessage ? 'items-end' : 'items-start'
                }`}
              >
                <span>{item.nickname}</span>
                <span
                  className={`max-w-xs px-4 py-2 rounded-lg break-all ${
                    isMyMessage
                      ? 'rounded-br-none bg-blue-600 text-white'
                      : 'rounded-bl-none bg-gray-300 text-gray-600'
                  }`}
                >
                  {item.message}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className='w-full p-6 bg-white'>
        <div className='flex gap-4'>
          <input
            type='text'
            name='message'
            className='w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-blue-500 focus:shadow-md'
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              e.nativeEvent.isComposing === false &&
              handleSubmit(e)
            }
            value={message}
            ref={messageInputRef}
          />
          <button
            type='submit'
            className='block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg disabled:bg-gray-300 disabled:shadow-none '
            onClick={handleSubmit}
            disabled={message === ''}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
