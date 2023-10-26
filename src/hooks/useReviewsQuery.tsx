import { getReviews } from "@/utils/review-utils";
import { useQuery } from "@tanstack/react-query";

const useReviewsQuery = (movieID: string) =>
  useQuery({
    queryFn: async ({ queryKey }) => await getReviews(queryKey[1]),
    queryKey: ["reviews", movieID],
  });

export default useReviewsQuery;
