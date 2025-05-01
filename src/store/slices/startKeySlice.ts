import {createSlice} from '@reduxjs/toolkit';

interface StartKeyState {
  hasStarted: boolean;
  whitelist: string[];
  showWelcome: boolean;
}

const initialState: StartKeyState = {
  hasStarted: false,
  whitelist: ['admin', 'user', 'guest'],
  showWelcome: true,
};

const startKeySlice = createSlice({
  name: 'startKey',
  initialState,
  reducers: {
    setStartKey: (state, action) => {
      const key = action.payload;
      if (!key || state.whitelist.includes(key)) {
        state.hasStarted = true;
      }
    },
    resetStartKey: state => {
      state.hasStarted = false;
    },
    setShowWelcome: (state, action) => {
      state.showWelcome = action.payload;
    },
  },
});

export const {setStartKey, resetStartKey, setShowWelcome} =
  startKeySlice.actions;
export default startKeySlice.reducer;
