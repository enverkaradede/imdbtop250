import cheerio from 'cheerio';

type HttpMethod = 'GET' | 'POST';

type HttpHeader = Record<string, string>;

type HttpMode = 'cors' | 'no-cors' | 'same-origin';

type RequestOptions = {
  method?: HttpMethod;
  headers?: HttpHeader;
  mode?: HttpMode;
};

type FetcherProps = {
  url: string;
} & RequestOptions;

const fetcher = async ({ url, ...rest }: FetcherProps): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: rest.method || 'GET',
    headers: rest.headers,
    mode: rest.mode || 'cors',
  };

  const result = await fetch(url, requestOptions);
  return result;
};

type MovieProps = {
  id: number;
  name: string;
  year: number;
  duration: string;
  rating: string;
  image: string | undefined;
};

const fetchMovieList = async (): Promise<MovieProps[]> => {
  const movieList: MovieProps[] = [];

  const result = await fetcher({ url: 'https://m.imdb.com/chart/top/' });
  const html = await result.text();
  const parser = cheerio.load(html);
  const list = parser('li.ipc-metadata-list-summary-item').toArray();

  const movieListPromises = list.map(async (li, i) => {
    const headerElement = parser(li)
      .find('h3.ipc-title__text')
      .text()
      .replace(`${i + 1}. `, '');
    const image = parser(li).find('img.ipc-image').attr('src')?.toString();

    // const imageBlob = image
    //   ? await fetcher({ url: image })
    //       .then((resp) => resp.blob())
    //       .then((blob) => blob.toString())
    //   : undefined;

    const rating = parser(li)
      .find('span.ipc-rating-star')
      .text()
      .replace('Rate', '');

    const childElements = parser(li)
      .find('span.sc-b189961a-8')
      .toArray()
      .map((el) => {
        return parser(el).text();
      });

    return {
      id: i + 1,
      name: headerElement,
      year: parseInt(childElements[0], 10),
      duration: childElements[1],
      rating,
      image,
    };
  });

  const movieData = await Promise.all(movieListPromises);
  movieList.push(...movieData);

  return movieList;
};

export type { MovieProps };
export { fetcher, fetchMovieList };
