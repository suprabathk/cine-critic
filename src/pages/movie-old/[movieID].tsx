/* eslint-disable @next/next/no-img-element */
import { getMovieDetails } from "@/utils/movie-utils";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import movieStyles from "@/styles/movie.module.css";
import Link from "next/link";
import MovieInfo from "@/components/movie/MovieInfo";
import { getReviews } from "@/utils/review-utils";
import MovieOverview from "@/components/movie/MovieOverView";
import MovieReview from "@/components/movie/MovieReview";
import { useState, useEffect } from "react";
import { MoviesSkeleton } from "@/loadingSkeletons/homepage";
import MoviePageSkeleton from "@/loadingSkeletons/moviePage-old";

const MoviePageContent = ({ movieID }: { movieID: string }) => {
  const movieQuery = useQuery({
    queryFn: async ({ queryKey }) => await getMovieDetails(queryKey[1]),
    queryKey: ["movie", movieID],
  });

  const reviewsQuery = useQuery({
    queryFn: async ({ queryKey }) => await getReviews(queryKey[1]),
    queryKey: ["reviews", movieID],
  });

  return (
    <div
      className={movieStyles.backgroundDiv}
      // style={{
      //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGES}/${movieQuery.data?.backdrop_path})`,
      // }}
    >
      <Box marginTop="2rem">
        <Breadcrumbs aria-label="breadcrumb" separator=">">
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">{movieQuery.data?.title}</Typography>
        </Breadcrumbs>
        {movieID && !movieQuery.isLoading && !reviewsQuery.isLoading ? (
          // {false ? (
          <Grid marginTop="2rem" container>
            <Grid item xs={12} sm={3}>
              <MovieInfo movie={movieQuery.data!} />
            </Grid>
            <Grid item xs={12} sm={8.5}>
              <Stack
                marginLeft={{ sm: "2rem" }}
                marginTop={{ xs: "2rem", sm: "0" }}
              >
                <MovieOverview movie={movieQuery.data!} />
                <MovieReview movieID={movieID} reviews={reviewsQuery.data!} />
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <MoviePageSkeleton />
        )}
      </Box>
    </div>
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

  return movieID && authorized ? <MoviePageContent movieID={movieID} /> : <></>;
};

export default MoviePage;
