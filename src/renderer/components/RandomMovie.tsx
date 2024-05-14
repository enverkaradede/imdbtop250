import React, { useState } from 'react';
import { MovieProps } from 'renderer/store/slicers/movieReducer';
import MovieCard from './MovieCard';
import UnknownMovieIcon from '../images/movie.png';

function RandomMovie({
  movieList,
  allMoviesList,
}: {
  movieList: MovieProps[];
  allMoviesList: MovieProps[];
}) {
  const initialMovieState: MovieProps = {
    id: 0,
    name: '??',
    duration: '????',
    year: '????',
    image: UnknownMovieIcon,
    isWatched: 0,
    rating: '??',
  };
  const [movieCard, setMovieCard] = useState<MovieProps>(initialMovieState);

  //* Only for the shuffle animation on UI.
  //* It's shuffling from all movies so that...
  //* ...it will have the same movie length all the time.
  const shuffleMovieCards = () => {
    const randomMovieIndexForShuffle = Math.floor(
      Math.random() * allMoviesList.length,
    );
    setMovieCard(allMoviesList[randomMovieIndexForShuffle]);
  };

  const handleRandomMoviePicker = async (): Promise<void> => {
    const shuffler = setInterval(shuffleMovieCards, 100);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        clearInterval(shuffler);
        resolve();
      }, 3000);
    });

    const randomMovieIndex = Math.floor(Math.random() * movieList.length);
    setMovieCard(movieList[randomMovieIndex]);
  };

  return (
    <div>
      {movieCard && (
        <MovieCard
          id={movieCard.id}
          name={movieCard.name}
          year={movieCard.year}
          duration={movieCard.duration}
          image={movieCard.image}
          rating={movieCard.rating}
          isWatched={movieCard.isWatched}
        />
      )}
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
