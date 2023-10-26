import { getMovieDetails } from "@/utils/movie-utils";
import { useQuery } from "@tanstack/react-query";

const useMovieQuery = (movieID: string) =>
  useQuery({
    queryFn: async ({ queryKey }) => await getMovieDetails(queryKey[1]),
    queryKey: ["movie", movieID],
  });

export default useMovieQuery;
