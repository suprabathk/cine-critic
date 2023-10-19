import axios from "axios";

const getAuthTokenOptions = {
  method: "GET",
  url: `${process.env.NEXT_PUBLIC_TMDB_API}/authentication/token/new`,
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
  url: `${process.env.NEXT_PUBLIC_TMDB_API}/authentication/token/validate_with_login`,
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
    return { data: { success: false } };
  }
};

export const isAuth = () =>
  typeof window !== undefined && !!localStorage.getItem("authToken");
