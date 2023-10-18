/* eslint-disable @next/next/no-img-element */
import { getMovieDetails } from "@/utils/movie-utils";
import {
  Box,
  Chip,
  CircularProgress,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import movieStyles from "@/styles/movie.module.css";
import { getReviews } from "@/utils/review-utils";
import { useState, useEffect } from "react";
import {
  AccessAlarm,
  CalendarMonthOutlined,
  People,
} from "@mui/icons-material";
import MovieReview from "@/components/movie/MovieReview";

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
    <Box>
      <div
        className={movieStyles.moviePageBanner}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGES}/${movieQuery.data?.backdrop_path})`,
        }}
      >
        <Stack
          direction="row"
          alignItems="start"
          justifyContent="start"
          width="100%"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGES}/${movieQuery.data?.poster_path}`}
            alt="poster"
            className={movieStyles.moviePagePoster}
          />
          <Stack
            width="100%"
            height="100%"
            alignItems="start"
            justifyContent="space-between"
          >
            <Box width="100%">
              <Typography variant="h4" fontWeight="600" marginTop="0.5rem">
                {movieQuery.data?.title}
              </Typography>
              <Typography variant="subtitle2" marginTop="0.2rem">
                {movieQuery.data?.overview}
              </Typography>

              <Stack direction={{ xs: "column-reverse", md: "column" }}>
                <Stack direction="row" gap="0.5rem" marginTop="1rem">
                  {movieQuery.data?.genres.map((genre) => (
                    <Chip label={genre.name} size="small" key={genre.id} />
                  ))}
                </Stack>
                <Stack
                  direction="row"
                  marginTop="1rem"
                  gap="1rem"
                  justifyContent={{ xs: "space-between", md: "start" }}
                >
                  <Chip
                    label={movieQuery.data?.release_date}
                    icon={<CalendarMonthOutlined />}
                    size="small"
                  />
                  <Chip
                    label={movieQuery.data?.runtime + " Mins"}
                    icon={<AccessAlarm />}
                    size="small"
                  />
                </Stack>
              </Stack>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              gap="0.5rem"
              marginBottom="0.5rem"
              marginTop="1rem"
            >
              <Rating value={movieQuery.data?.vote_average! / 2} readOnly />
              <Chip
                icon={<People />}
                label={movieQuery.data?.vote_count}
                size="small"
              />
            </Stack>
          </Stack>
        </Stack>
      </div>
      <Box paddingLeft="3rem" paddingRight="3rem" paddingBottom="3rem">
        {movieID && !reviewsQuery.isLoading && (
          <MovieReview movieID={movieID} reviews={reviewsQuery.data!} />
        )}
      </Box>
    </Box>
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
    <CircularProgress />
  );
};

export default MoviePage;
