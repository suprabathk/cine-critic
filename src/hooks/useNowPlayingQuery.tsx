import { getNowPlayingMoviesList } from "@/utils/movie-utils";
import { useQuery } from "@tanstack/react-query";

export const useNowPlayingQuery = () =>
  useQuery({
    queryFn: getNowPlayingMoviesList,
    queryKey: ["nowPlaying"],
  });
