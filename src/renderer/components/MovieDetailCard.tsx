import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from 'renderer/store/rootStore';
import { setEndpoint } from 'renderer/store/slicers/generalReducer';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { setMovie } from 'renderer/store/slicers/movieReducer';
import MovieCard from './MovieCard';
import Header from './Header';
import Loading from './Loading';

function MovieDetailCard() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const movie = useSelector((state: RootState) => state.movieOps.movie);

  const getMovieById = async () => {
    if (id) {
      const movieFromDb = await window.electron.getMovieById(parseInt(id, 10));
      dispatch(setMovie(movieFromDb));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(setEndpoint(`/movie/${id}`));
    getMovieById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Link to="/all-movies" className="fixed top-1/2 left-11">
            <i className="fa-solid fa-arrow-left-long fa-2x dark:text-white" />
          </Link>
          <MovieCard
            id={movie.id}
            name={movie.name}
            year={movie.year}
            duration={movie.duration}
            image={movie.image}
            rating={movie.rating}
            isWatched={movie.isWatched}
          />
        </div>
      )}
    </div>
  );
}

export default MovieDetailCard;
