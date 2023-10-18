/* eslint-disable @next/next/no-img-element */
import { getMovieDetails } from "@/utils/movie-utils";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import movieStyles from "@/styles/movie.module.css";
import Link from "next/link";
import MovieInfo from "@/components/movie/MovieInfo";
import { getReviews } from "@/utils/review-utils";
import MovieOverview from "@/components/movie/MovieOverView";
import MovieReview from "@/components/movie/MovieReview";

const MoviePage = ({ movieID }: { movieID: string }) => {
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
        {movieID && !movieQuery.isFetching && !reviewsQuery.isFetching ? (
          <Stack direction="row" marginTop="2rem">
            <MovieInfo movie={movieQuery.data!} />
            <Stack marginLeft="2rem">
              <MovieOverview movie={movieQuery.data!} />
              <MovieReview movieID={movieID} reviews={reviewsQuery.data!} />
            </Stack>
          </Stack>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </div>
  );
};

export default MoviePage;
