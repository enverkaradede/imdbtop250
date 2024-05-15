import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type GeneralOpsState = {
  endpoint: string;
  filterText: string;
};

const initialState: GeneralOpsState = {
  endpoint: '',
  filterText: '',
};

const generalOpsSlice = createSlice({
  name: 'generalOps',
  initialState,
  reducers: {
    setEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
    },
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },
  },
});

export const { setEndpoint, setFilterText } = generalOpsSlice.actions;
export default generalOpsSlice.reducer;
