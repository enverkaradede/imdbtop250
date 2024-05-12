import React from 'react';
import { MovieProps } from 'renderer/store/slicers/movieReducer';
import MiniMovieCard from './MiniMovieCard';

function MoviesGrid({ movieList }: { movieList: MovieProps[] }) {
  return (
    <div className="overflow-auto h-[80vh]">
      <div className="grid grid-cols-8 xl:grid-cols-12 gap-8 m-8">
        {movieList.map((movie) => {
          return (
            <MiniMovieCard
              id={movie.id}
              image={movie.image}
              isWatched={movie.isWatched}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MoviesGrid;
