/* eslint-disable no-console */
import {
  createMoviesTable,
  deleteMoviesTable,
  getMovieList,
  insertMovieToMoviesTable,
} from './Database.service';
import { MovieProps, fetchMovieList } from './IMDbScraper.service';

const createAndPopulate = async (): Promise<void> => {
  const movieList: MovieProps[] = await fetchMovieList();
  console.log(
    '\n\n==================\nMovie List fetched from IMDb!\n==================\n',
  );

  deleteMoviesTable();

  createMoviesTable();
  console.log(
    '\n==================\n"movies" table is created!\n==================\n',
  );

  console.log(
    '\n==================\nStarting to insert movie data into "movies" table!\n==================\n',
  );
  movieList.forEach((movie) => {
    insertMovieToMoviesTable(movie);
    console.log(
      `\n==================\n${movie.name} is inserted into the "movies" table!\n==================\n`,
    );
  });

  console.log(
    '\n==================\nGetting movie list from "movies" table!\n==================\n',
  );
  const movies: unknown[] = getMovieList();

  console.log(movies);
};

createAndPopulate();
