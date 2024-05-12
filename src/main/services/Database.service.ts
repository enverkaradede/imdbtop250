import Database from 'better-sqlite3';
import path from 'path';
import { MovieProps } from './IMDbScraper.service';

const connect = () => {
  return Database(
    path.join(__dirname, '../../../', 'release/app', 'database.db'),
    // eslint-disable-next-line no-console
    { verbose: console.log, fileMustExist: false },
  );
};

const createMoviesTable = () => {
  const db = connect();
  const query =
    'CREATE TABLE IF NOT EXISTS movies(id INT, name TEXT, year INT, image TEXT, duration TEXT, rating TEXT, is_watched NUMERIC)';
  db.exec(query);
  db.close();
};

const insertMovieToMoviesTable = (movie: MovieProps) => {
  const { id, name, year, duration, image, rating } = movie;
  const db = connect();
  const smt = db.prepare(
    'INSERT INTO movies(id, name, year, image, duration, rating, is_watched) VALUES (@id, @name, @year, @image, @duration, @rating, 0)',
  );

  return smt.run({ id, name, year, image, duration, rating });
};

const getMovieList = () => {
  const db = connect();
  const stm = db.prepare(
    'SELECT id, name, year, image, duration, rating, is_watched AS isWatched FROM movies',
  );

  return stm.all();
};

const getUnwatchedMovies = () => {
  const db = connect();
  const smt = db.prepare(
    'SELECT id, name, year, image, duration, rating, is_watched AS isWatched FROM movies WHERE is_watched=0',
  );

  return smt.all();
};

const updateWatchedMovie = (id: number, isWatched: boolean) => {
  const db = connect();
  const ifWatched = isWatched ? 1 : 0;
  const smt = db.prepare(
    'UPDATE movies SET is_watched = @ifWatched WHERE id = @id',
  );

  smt.run({ ifWatched, id });
};

const getMovieById = (id: number) => {
  const db = connect();
  const smt = db.prepare(
    'SELECT id, name, year, image, duration, rating, is_watched AS isWatched FROM movies WHERE id=@id',
  );

  return smt.get({ id });
};

export {
  getMovieList,
  createMoviesTable,
  insertMovieToMoviesTable,
  getMovieById,
  getUnwatchedMovies,
  updateWatchedMovie,
};
