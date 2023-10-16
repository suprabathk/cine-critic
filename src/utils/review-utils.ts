import { Review } from "@/types/review";

export const getReviews = async (movieID: string): Promise<Review[]> => {
  return await Promise.resolve(
    typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(movieID) ?? '{"reviews":[]}').reviews
  );
};

export const addReview = async (movieID: string, review: Review) => {
  return await Promise.resolve(
    typeof window !== "undefined" &&
      localStorage.setItem(
        movieID,
        JSON.stringify({
          reviews: [
            { ...review, rating: review.rating * 2 },
            ...JSON.parse(localStorage.getItem(movieID) ?? '{"reviews":[]}')
              .reviews,
          ],
        })
      )
  );
};
