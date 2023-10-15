/* eslint-disable @next/next/no-img-element */
import { getMovieDetails } from "@/utils/movie-utils";
import {
  Box,
  Breadcrumbs,
  Card,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import movieStyles from "@/styles/movie.module.css";
import {
  AccessAlarm,
  CalendarMonthOutlined,
  People,
} from "@mui/icons-material";
import Link from "next/link";

const MoviePage = () => {
  const router = useRouter();
  const movieID = Array.isArray(router.query.movieID)
    ? router.query.movieID[0]
    : router.query.movieID;

  const movieQuery = useQuery({
    queryFn: () => getMovieDetails(movieID ?? ""),
    queryKey: ["movie"],
    enabled: !!movieID,
  });

  return (
    <div
      className={movieStyles.backgroundDiv}
      // style={{
      //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGES}/${movieQuery.data?.backdrop_path})`,
      // }}
    >
      <Box>
        <Breadcrumbs aria-label="breadcrumb" separator=">">
          <Link color="inherit" href="/dashboard">
            Home
          </Link>
          <Typography color="text.primary">{movieQuery.data?.title}</Typography>
        </Breadcrumbs>
        <Stack direction="row" marginTop="1rem">
          <Stack maxWidth="23vw" alignItems="center" justifyContent="center">
            <img
              src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGES}/${movieQuery.data?.poster_path}`}
              alt="poster"
              className={movieStyles.posterDiv}
            />
            <Typography
              variant="h5"
              fontWeight="600"
              textAlign="center"
              marginTop="1rem"
              lineHeight="1.5rem"
            >
              {movieQuery.data?.title}
            </Typography>
            <Typography variant="caption" textAlign="center" marginTop="0.3rem">
              {movieQuery.data?.tagline}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              width="100%"
              marginTop="1rem"
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
            <Stack
              direction="row"
              marginTop="0.5rem"
              justifyContent="space-evenly"
              width="100%"
            >
              <Rating
                size="small"
                value={movieQuery.data?.vote_average ?? 10 / 2}
                readOnly
              />
              <Chip
                icon={<People />}
                label={movieQuery.data?.vote_count}
                size="small"
              />
            </Stack>
          </Stack>
          <Stack marginLeft="2rem">
            <Typography variant="h4">Overview</Typography>
            <Typography variant="body2">{movieQuery.data?.overview}</Typography>
            <Typography variant="h4" marginTop="1rem">
              Genre
            </Typography>
            <Stack direction="row" gap="0.5rem">
              {movieQuery.data?.genres.map((genre) => (
                <Chip label={genre.name} key={genre.id} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default MoviePage;
