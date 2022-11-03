export type movie = {
  id: number;
  poster_path: string;
  popularity: number;
  genre_ids: [];
  original_title: string;
  overview: string;
};

type duration = {
  maximum: string;
  minimum: string;
};

export type data = {
  dates: duration;
  page: number;
  results: movie[];
  total_pages: number;
  total_results: number;
};
