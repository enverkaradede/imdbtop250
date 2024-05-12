import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from 'renderer/components/Header';
import MoviesGrid from 'renderer/components/MoviesGrid';
import { RootState, useAppDispatch } from 'renderer/store/rootStore';
import { setEndpoint } from 'renderer/store/slicers/generalReducer';
import { MovieProps, setMovieList } from 'renderer/store/slicers/movieReducer';

function AllMovies() {
  const movieList: MovieProps[] = useSelector(
    (state: RootState) => state.movieOps.movieList,
  );
  const dispatch = useAppDispatch();

  const getAllMovies = async () => {
    const result = await window.electron.getMovieList();

    dispatch(setMovieList(result));
  };

  useEffect(() => {
    dispatch(setEndpoint('/all-movies'));
    getAllMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <MoviesGrid movieList={movieList} />
    </div>
  );
}

export default AllMovies;
