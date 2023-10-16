import { MovieDetails } from "@/types/movies";
import axios from "axios";

const getNowPlayingMoviesListOptions = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDNlMmY1NTdlMjMxZmZkNmQ5ZDNjODMwM2NjYTRiMSIsInN1YiI6IjY1MjRmOGRmMGNiMzM1MTZmZDQ2ZWJiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GceWSXdFFaaI77fSU7zVhan_nRshe3c5GSGoZcVj35Y",
  },
};

export const getNowPlayingMoviesList = async () => {
  return (await axios.request(getNowPlayingMoviesListOptions)).data;
};

const getDiscoverOptions = {
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

export const getDiscoverList = async () => {
  console.log("hiihi");

  return (await axios.request(getDiscoverOptions)).data;
};

const getMovieDetailsOptions = (movieID: string) => ({
  method: "GET",
  url: `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`,
  },
});

export const getMovieDetails = async (
  movieID: string
): Promise<MovieDetails> => {
  return (await axios.request(getMovieDetailsOptions(movieID))).data;
};
