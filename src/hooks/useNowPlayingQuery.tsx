import { getNowPlayingMoviesList } from "@/utils/movie-utils";
import { useQuery } from "@tanstack/react-query";

const useNowPlayingQuery = () =>
  useQuery({
    queryFn: getNowPlayingMoviesList,
    queryKey: ["nowPlaying"],
  });

export default useNowPlayingQuery;
