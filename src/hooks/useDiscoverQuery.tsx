import { getDiscoverList } from "@/utils/movie-utils";
import { useQuery } from "@tanstack/react-query";

const useDiscoverQuery = () =>
  useQuery({
    queryFn: getDiscoverList,
    queryKey: ["discover"],
  });

export default useDiscoverQuery;
