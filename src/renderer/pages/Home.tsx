import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from 'renderer/components/Header';
import RandomMovie from 'renderer/components/RandomMovie';
import { RootState, useAppDispatch } from 'renderer/store/rootStore';
import { setEndpoint } from 'renderer/store/slicers/generalReducer';
import { MovieProps, setMovieList } from 'renderer/store/slicers/movieReducer';

function Home() {
  const [allMovieList, setAllMovieList] = useState<MovieProps[]>([]);
  const movieList: MovieProps[] = useSelector(
    (state: RootState) => state.movieOps.movieList,
  );
  const dispatch = useAppDispatch();

  const getUnwatchedMovies = async () => {
    const result = await window.electron.getUnwatchedMovies();

    dispatch(setMovieList(result));
  };

  const getAllMovies = async () => {
    const result = await window.electron.getMovieList();
    setAllMovieList(result);
  };

  useEffect(() => {
    dispatch(setEndpoint('/'));
    getUnwatchedMovies();
    getAllMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <RandomMovie movieList={movieList} allMoviesList={allMovieList} />
    </div>
  );
}

export default Home;
