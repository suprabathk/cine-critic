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
