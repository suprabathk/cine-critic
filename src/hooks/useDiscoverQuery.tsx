import { getDiscoverList } from "@/utils/movie-utils";
import { useQuery } from "@tanstack/react-query";

export const useDiscoverQuery = () =>
  useQuery({
    queryFn: getDiscoverList,
    queryKey: ["discover"],
  });
