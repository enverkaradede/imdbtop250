import { MovieProps } from 'renderer/store/slicers/movieReducer';
import React from 'react';
import MovieCard from './MovieCard';

function MovieInfoList({
  movieList,
}: {
  movieList: MovieProps[];
}): React.JSX.Element {
  return (
    <div className="overflow-auto h-[80vh]">
      {movieList.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            id={movie.id}
            name={movie.name}
            image={movie.image}
            year={movie.year}
            duration={movie.duration}
            rating={movie.rating}
            isWatched={movie.isWatched}
          />
        );
      })}
    </div>
  );
}

export default MovieInfoList;
