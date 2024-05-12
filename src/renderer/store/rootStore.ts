import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import movieReducer from './slicers/movieReducer';
import generalReducer from './slicers/generalReducer';

const rootReducer = {
  movieOps: movieReducer,
  generalOps: generalReducer,
};

const rootStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default rootStore;
