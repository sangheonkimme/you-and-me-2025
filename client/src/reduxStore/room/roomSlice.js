import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nickname: {
    value: '',
    isSaved: false,
  },
  roomname: '',
  totalPeopleNum: 0,
  isEnteredRoom: false,
};

export const counterSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    changeNickName: (state, action) => {
      state.nickname.value = action.payload;
    },
    saveNickName: (state, action) => {
      state.nickname.isSaved = action.payload;
    },
    saveRoomName: (state, action) => {
      state.roomname = action.payload;
    },
    enterRoom: (state, action) => {
      state.isEnteredRoom = action.payload;
    },
    saveCountPeople: (state, action) => {
      state.totalPeopleNum = action.payload;
    },
  },
});

export const {
  changeNickName,
  saveNickName,
  saveRoomName,
  enterRoom,
  saveCountPeople,
} = counterSlice.actions;

export default counterSlice.reducer;
