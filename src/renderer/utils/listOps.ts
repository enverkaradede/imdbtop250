import { MovieProps } from 'renderer/store/slicers/movieReducer';

const filterMovieList = (
  movieList: MovieProps[],
  filterText: string,
): MovieProps[] => {
  const filteredMovieList = movieList.filter((movie) => {
    if (
      movie.duration
        .toString()
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      `${movie.id.toString().toLowerCase()}.`.includes(
        filterText.toLowerCase(),
      ) ||
      movie.name.toString().toLowerCase().includes(filterText.toLowerCase()) ||
      movie.year.toString().toLowerCase().includes(filterText.toLowerCase()) ||
      movie.rating.toString().toLowerCase().includes(filterText.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  return filteredMovieList;
};

// eslint-disable-next-line import/prefer-default-export
export { filterMovieList };
