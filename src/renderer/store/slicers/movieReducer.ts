import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type MovieProps = {
  id: number;
  name: string;
  year: number | string;
  duration: string;
  rating: string;
  image: string | undefined;
  isWatched: 0 | 1;
};

type MovieOpsState = {
  movieList: MovieProps[];
};

const initialState: MovieOpsState = {
  movieList: [],
};

const movieOpsSlice = createSlice({
  name: 'movieOps',
  initialState,
  reducers: {
    setMovieList: (state, action: PayloadAction<MovieProps[]>) => {
      state.movieList = action.payload;
    },
  },
});

export type { MovieProps };
export const { setMovieList } = movieOpsSlice.actions;
export default movieOpsSlice.reducer;
