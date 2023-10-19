import { Review } from "@/types/review";

export const getReviews = async (movieID: string): Promise<Review[]> => {
  return await Promise.resolve(
    typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(movieID) ?? "[]")
  );
};

export const addReview = async (movieID: string, review: Review) => {
  return await Promise.resolve(
    typeof window !== "undefined" &&
      localStorage.setItem(
        movieID,
        JSON.stringify([
          { ...review, rating: review.rating },
          ...JSON.parse(localStorage.getItem(movieID) ?? "[]"),
        ])
      )
  );
};

export const deleteReview = async (movieID: string, reviewID: string) => {
  const reviews: Review[] = JSON.parse(localStorage.getItem(movieID) ?? "[]");

  return await Promise.resolve(
    typeof window !== "undefined" &&
      localStorage.setItem(
        movieID,
        JSON.stringify(reviews.filter((review) => review.id !== reviewID))
      )
  );
};

export const editReview = async (movieID: string, newReview: Review) => {
  const reviews: Review[] = JSON.parse(localStorage.getItem(movieID) ?? "[]");
  return await Promise.resolve(
    typeof window !== "undefined" &&
      localStorage.setItem(
        movieID,
        JSON.stringify(
          reviews.map((review) =>
            newReview.id === review.id ? newReview : review
          )
        )
      )
  );
};
