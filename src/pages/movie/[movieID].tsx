/* eslint-disable @next/next/no-img-element */
import { getMovieDetails } from "@/utils/movie-utils";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/utils/review-utils";
import { useState, useEffect } from "react";
import MovieReview from "@/sections/movie/MovieReview";
import MoviepageSkeleton from "@/loadingSkeletons/moviepage";
import MovieInfo from "@/sections/movie/MovieInfo";

const MoviePageContent = ({ movieID }: { movieID: string }) => {
  const movieQuery = useQuery({
    queryFn: async ({ queryKey }) => await getMovieDetails(queryKey[1]),
    queryKey: ["movie", movieID],
  });

  const reviewsQuery = useQuery({
    queryFn: async ({ queryKey }) => await getReviews(queryKey[1]),
    queryKey: ["reviews", movieID],
  });

  return movieID && !movieQuery.isLoading && !reviewsQuery.isLoading ? (
    <>
      <MovieInfo movie={movieQuery.data!} />
      <Box
        paddingLeft={{ xs: "1rem", sm: "3rem" }}
        paddingRight={{ xs: "1rem", sm: "3rem" }}
        paddingBottom={{ xs: "1rem", sm: "3rem" }}
      >
        <MovieReview movieID={movieID} reviews={reviewsQuery.data!} />
      </Box>
    </>
  ) : (
    <MoviepageSkeleton />
  );
};

const MoviePage = () => {
  const router = useRouter();
  const movieID = Array.isArray(router.query.movieID)
    ? router.query.movieID[0]
    : router.query.movieID;
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    !localStorage.getItem("authToken")
      ? router.push("/auth")
      : setAuthorized(true);
  }, [router]);

  return movieID && authorized ? (
    <MoviePageContent movieID={movieID} />
  ) : (
    <MoviepageSkeleton />
  );
};

export default MoviePage;
