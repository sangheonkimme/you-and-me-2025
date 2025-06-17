import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeNickName, saveNickName } from '@/src/reduxStore/room/roomSlice';
import { useSocket } from '@/src/hooks/useSocket';

const FormNickName = () => {
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.room.nickname.value);
  const nickNameRef = useRef();
  const isSavedNickName = useSelector((state) => state.room.nickname.isSaved);
  const { socket } = useSocket();

  useEffect(() => {
    !isSavedNickName && nickNameRef.current.focus();
  }, [isSavedNickName]);

  const handleChangeNickName = (e) => {
    dispatch(changeNickName(e.target.value));
  };

  const handleNickNameKeyDown = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    toggleSaveNickName();
  };

  const toggleSaveNickName = () => {
    dispatch(saveNickName(!isSavedNickName));
    socket.emit('nickname', nickname);
  };

  return (
    <div className='text-left'>
      <label className='font-bold'>nickname</label>
      <div className='flex flex-col mt-2 gap-4 md:items-center md:flex-row md:justify-between min-h-[50px]'>
        <input
          type='text'
          name='nickname'
          placeholder='nick name'
          onChange={handleChangeNickName}
          onKeyDown={handleNickNameKeyDown}
          value={nickname}
          ref={nickNameRef}
          className={`py-3 px-4 rounded-md border border-[#e0e0e0] bg-white text-base font-medium  text-[#6B7280] outline-none ${
            isSavedNickName ? '' : 'focus:border-blue-500 focus:shadow-md'
          }`}
          required
          readOnly={isSavedNickName}
        />
        <button
          type='button'
          onClick={toggleSaveNickName}
          className={`px-6 py-3 text-white rounded-lg ${
            isSavedNickName ? 'bg-gray-400' : 'bg-blue-500'
          }`}
        >
          {isSavedNickName ? 'edit' : 'save'}
        </button>
      </div>
    </div>
  );
};

export default FormNickName;
