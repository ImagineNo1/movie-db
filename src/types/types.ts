export type movie = {
  id: number;
  poster_path: string;
  genre_ids: [];
  original_title: string;
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
