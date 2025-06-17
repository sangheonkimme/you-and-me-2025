import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveRoomName } from '@/src/reduxStore/room/roomSlice';

const FormEnterRoom = () => {
  const dispatch = useDispatch();
  const roomName = useSelector((state) => state.room.roomname);
  const isSavedNickName = useSelector((state) => state.room.nickname.isSaved);
  const enterRoomRef = useRef();

  useEffect(() => {
    isSavedNickName && enterRoomRef.current.focus();
  }, [isSavedNickName]);

  const handleChangeRoomName = (e) => {
    dispatch(saveRoomName(e.target.value));
  };

  return (
    <div className='text-left'>
      <label className='font-bold'>Room name</label>
      <div className='flex flex-col gap-4 mt-2 md:pt-1 md:gap-5'>
        <input
          type='text'
          placeholder='room name'
          onChange={handleChangeRoomName}
          value={roomName}
          className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-500 focus:shadow-md'
          required
          ref={enterRoomRef}
        />
        <button
          type='submit'
          className='px-6 py-3 text-white bg-blue-500 rounded-lg'
        >
          Enter Room
        </button>
      </div>
    </div>
  );
};

export default FormEnterRoom;
