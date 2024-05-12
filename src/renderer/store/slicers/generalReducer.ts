import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type GeneralOpsState = {
  endpoint: string;
};

const initialState: GeneralOpsState = {
  endpoint: '',
};

const generalOpsSlice = createSlice({
  name: 'generalOps',
  initialState,
  reducers: {
    setEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
    },
  },
});

export const { setEndpoint } = generalOpsSlice.actions;
export default generalOpsSlice.reducer;
