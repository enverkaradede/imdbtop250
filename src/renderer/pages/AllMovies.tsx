import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from 'renderer/components/Header';
import MoviesGrid from 'renderer/components/MoviesGrid';
import SearchBar from 'renderer/components/SearchBar';
import { RootState, useAppDispatch } from 'renderer/store/rootStore';
import { setEndpoint } from 'renderer/store/slicers/generalReducer';
import { MovieProps, setMovieList } from 'renderer/store/slicers/movieReducer';
import { filterMovieList } from 'renderer/utils/listOps';

function AllMovies() {
  const movieList: MovieProps[] = useSelector(
    (state: RootState) => state.movieOps.movieList,
  );
  const filterText = useSelector(
    (state: RootState) => state.generalOps.filterText,
  );
  const [filteredList, setFilteredList] = useState<MovieProps[]>(movieList);
  const dispatch = useAppDispatch();

  const getAllMovies = async () => {
    const result = await window.electron.getMovieList();

    dispatch(setMovieList(result));
  };

  useEffect(() => {
    const filteredMovies = filterMovieList(movieList, filterText);

    setFilteredList(filteredMovies);
  }, [filterText, movieList]);

  useEffect(() => {
    dispatch(setEndpoint('/all-movies'));
    getAllMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <SearchBar className="my-3" />
      <MoviesGrid movieList={filteredList} />
    </div>
  );
}

export default AllMovies;
