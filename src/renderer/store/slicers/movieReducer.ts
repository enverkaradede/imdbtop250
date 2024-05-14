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
  movie: MovieProps;
  isMovieWatched: boolean;
};

const initialState: MovieOpsState = {
  movieList: [],
  movie: {
    id: 0,
    name: '??',
    duration: '????',
    year: '????',
    image: '',
    isWatched: 0,
    rating: '??',
  },
  isMovieWatched: false,
};

const movieOpsSlice = createSlice({
  name: 'movieOps',
  initialState,
  reducers: {
    setMovieList: (state, action: PayloadAction<MovieProps[]>) => {
      state.movieList = action.payload;
    },
    setMovie: (state, action: PayloadAction<MovieProps>) => {
      state.movie = action.payload;
    },
    setIsMovieWatched: (state, action: PayloadAction<boolean>) => {
      state.isMovieWatched = action.payload;
    },
  },
});

export type { MovieProps };
export const { setMovieList, setMovie, setIsMovieWatched } =
  movieOpsSlice.actions;
export default movieOpsSlice.reducer;
