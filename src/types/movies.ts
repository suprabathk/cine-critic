export type MoviePreview = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  name: string;
};

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  revenue: number;
  budget: number;
  runtime: number;
  tagline: string;
};
