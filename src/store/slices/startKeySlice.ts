import { createSlice } from '@reduxjs/toolkit';

interface StartKeyState {
  hasStarted: boolean;
  whitelist: string[];
}

const initialState: StartKeyState = {
  hasStarted: false,
  whitelist: ['admin', 'user', 'guest']
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
  },
});

export const { setStartKey } = startKeySlice.actions;
export default startKeySlice.reducer;