/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'renderer/store/rootStore';
import {
  MovieProps,
  setIsMovieWatched,
  setMovieList,
} from 'renderer/store/slicers/movieReducer';

function MovieCard({
  id,
  name,
  duration,
  year,
  image,
  rating,
  isWatched,
}: MovieProps) {
  const dispatch = useAppDispatch();
  const isMovieWatched = useSelector(
    (state: RootState) => state.movieOps.isMovieWatched,
  );
  const endpoint = useSelector((state: RootState) => state.generalOps.endpoint);

  const updateUnwatchedMovies = async () => {
    await window.electron.updateIsWatched(id, !isMovieWatched);
    const updatedMovieList = await window.electron.getUnwatchedMovies();
    if (endpoint !== '/unwatched-movies') {
      dispatch(setIsMovieWatched(!isMovieWatched));
    }
    dispatch(setMovieList(updatedMovieList));
  };

  const handleIsWatched = async () => {
    await updateUnwatchedMovies();
  };

  useEffect(() => {
    dispatch(setIsMovieWatched(isWatched === 1));
    if (endpoint === '/unwatched-movies') {
      dispatch(setIsMovieWatched(false));
    }
  }, [dispatch, endpoint, id, isWatched]);

  return (
    <div className="flex flex-col w-auto justify-center items-center my-4 select-none">
      <div
        key={`movie-${id}`}
        className="flex flex-col items-center border-solid border-2 border-sky-200 rounded-lg bg-slate-400 dark:bg-slate-800 bg-opacity-75 dark:bg-opacity-65 w-96 h-[35rem] shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] hover:scale-105 transform transition duration-500"
      >
        <h3
          key={`movie-n-${id}`}
          className="font-bold text text-2xl text-center text-black dark:text-white mt-5 mb-3 underline"
        >
          {`${id}. ${name}`}
        </h3>

        <img
          key={`movie-i-${id}`}
          className={`${
            image?.includes('data') ? '' : 'object-contain'
          } w-52 h-96 rounded-xl shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]`}
          src={image}
          alt={`${name}-poster`}
          loading="lazy"
        />

        <table className="table-auto text-black dark:text-white mt-3">
          <tr>
            <td className="font-medium">Year:</td>
            <td className="text-right">{year}</td>
          </tr>
          <tr>
            <td className="font-medium">Duration:</td>
            <td className="text-right">{duration}</td>
          </tr>
          <tr>
            <td className="font-medium">Rating:</td>
            <td className="text-right">{rating}</td>
          </tr>
        </table>
        {id !== 0 && (
          <div className="flex flex-row justify-evenly w-full">
            <a
              href={`https://google.com/search?q=${name
                .toLowerCase()
                .replace(/ /g, '+')}+izle`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex mt-4 mb-2 w-28 h-8 text-center font-medium items-center justify-center bg-slate-600 dark:bg-slate-400 bg-opacity-55 text-white rounded-md hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] hover:scale-110 transform transition duration-500 select-none">
                Filmi İzle
              </div>
            </a>
            <div
              className={`flex mt-4 mb-2 w-28 h-8 text-center font-medium items-center justify-center ${
                isMovieWatched ? 'bg-red-600' : 'bg-green-600'
              } ${
                isMovieWatched ? 'dark:bg-red-400' : 'dark:bg-green-400'
              } bg-opacity-55 text-white rounded-md hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] hover:scale-110 transform transition duration-500 cursor-pointer select-none`}
              onClick={handleIsWatched}
            >
              {isMovieWatched ? 'İzlemedim' : 'İzledim'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
