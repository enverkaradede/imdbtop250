import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from 'renderer/components/Header';
import MovieInfoList from 'renderer/components/MovieInfoList';
import { RootState, useAppDispatch } from 'renderer/store/rootStore';
import { setEndpoint } from 'renderer/store/slicers/generalReducer';
import { MovieProps, setMovieList } from 'renderer/store/slicers/movieReducer';

function UnwatchedMovies() {
  const movieList: MovieProps[] = useSelector(
    (state: RootState) => state.movieOps.movieList,
  );
  const dispatch = useAppDispatch();

  const getUnwatchedMovies = async () => {
    const result = await window.electron.getUnwatchedMovies();

    dispatch(setMovieList(result));
  };

  useEffect(() => {
    dispatch(setEndpoint('/unwatched-movies'));
    getUnwatchedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <MovieInfoList movieList={movieList} />
    </div>
  );
}

export default UnwatchedMovies;
