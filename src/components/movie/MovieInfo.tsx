/* eslint-disable @next/next/no-img-element */
import {
  CalendarMonthOutlined,
  AccessAlarm,
  People,
} from "@mui/icons-material";
import { Stack, Typography, Chip, Rating } from "@mui/material";
import movieStyles from "@/styles/movie.module.css";
import { MovieDetails } from "@/types/movies";

const MovieInfo = ({ movie }: { movie: MovieDetails }) => {
  return (
    <Stack maxWidth="23vw" alignItems="center" justifyContent="start">
      <img
        src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGES}/${movie.poster_path}`}
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
        {movie.title}
      </Typography>
      <Typography variant="caption" textAlign="center" marginTop="0.3rem">
        {movie.tagline}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        width="100%"
        marginTop="1rem"
      >
        <Chip
          label={movie.release_date}
          icon={<CalendarMonthOutlined />}
          size="small"
        />
        <Chip
          label={movie.runtime + " Mins"}
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
        <Rating size="small" value={movie.vote_average! / 2} readOnly />
        <Chip icon={<People />} label={movie.vote_count} size="small" />
      </Stack>
    </Stack>
  );
};

export default MovieInfo;
