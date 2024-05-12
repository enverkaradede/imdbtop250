import React from 'react';
import { Link } from 'react-router-dom';

function MiniMovieCard({
  id,
  image,
  isWatched,
}: {
  id: number;
  isWatched: 0 | 1;
  image: string;
}) {
  return (
    <div className="flex flex-row justify-center items-center">
      <Link to={`/movie/${id}`}>
        <img
          src={image}
          alt=""
          className={`relative rounded-lg  ${
            isWatched === 1 ? 'grayscale' : 'grayscale-0'
          } hover:grayscale-0 hover:scale-125 hover:z-30 transform transition duration-500 cursor-pointer select-none`}
        />
      </Link>
    </div>
  );
}

export default MiniMovieCard;
