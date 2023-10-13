import axios from "axios";

const getAuthTokenOptions = {
  method: "GET",
  url: "https://api.themoviedb.org/3/authentication/token/new",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

export const getAuthToken = async () => {
  return (await axios.request(getAuthTokenOptions)).data.request_token;
};

const getSignInOptions = (data: {
  username: string;
  password: string;
  request_token: string;
}) => ({
  method: "POST",
  url: "https://api.themoviedb.org/3/authentication/token/validate_with_login",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`,
  },
  data: data,
});

export const signIn = async (data: {
  username: string;
  password: string;
  request_token: string;
}) => {
  try {
    return await axios.request(getSignInOptions(data));
  } catch (error) {
    return await { data: { success: false } };
  }
};

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
  return (await axios.request(getDiscoverOptions)).data;
};
