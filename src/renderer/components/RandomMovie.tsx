import React, { useState } from 'react';
import { MovieProps } from 'renderer/store/slicers/movieReducer';
import MovieInfo from './MovieCard';
import UnknownMovieIcon from '../images/movie.png';

function RandomMovie({ movieList }: { movieList: MovieProps[] }) {
  const [movieCard, setMovieCard] = useState<MovieProps>({
    id: 0,
    name: '??',
    duration: '????',
    year: '????',
    image: UnknownMovieIcon,
    isWatched: 0,
    rating: '??',
  });

  const shuffleMovieCards = () => {
    const randomMovieIndex = Math.floor(Math.random() * movieList.length);

    setMovieCard(movieList[randomMovieIndex]);
  };

  const handleRandomMoviePicker = () => {
    const shuffler = setInterval(shuffleMovieCards, 100);
    setTimeout(() => clearInterval(shuffler), 3000);
  };

  return (
    <div>
      <MovieInfo
        id={movieCard.id}
        name={movieCard.name}
        year={movieCard.year}
        duration={movieCard.duration}
        image={movieCard.image}
        rating={movieCard.rating}
        isWatched={movieCard.isWatched}
      />
      <div className="flex flex-row justify-center">
        <button
          type="button"
          className="bg-slate-100 w-40 h-8 rounded-md mt-5 hover:scale-110 transform transition duration-500 cursor-pointer select-none"
          onClick={handleRandomMoviePicker}
        >
          Rastgele Film Seç
        </button>
      </div>
    </div>
  );
}

export default RandomMovie;
