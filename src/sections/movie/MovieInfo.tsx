import {
  CalendarMonthOutlined,
  AccessAlarm,
  People,
} from "@mui/icons-material";
import { Stack, Box, Typography, Chip, Rating } from "@mui/material";
import movieStyles from "@/styles/movie.module.css";
import { MovieDetails } from "@/types/movies";

const MovieInfo = ({ movie }: { movie: MovieDetails }) => {
  return (
    <div
      className={movieStyles.moviePageBanner}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGES}/${movie.backdrop_path})`,
      }}
    >
      <Stack
        direction="row"
        alignItems="start"
        justifyContent="start"
        width="100%"
      >
        <img
          src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGES}/${movie.poster_path}`}
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
              {movie.title}
            </Typography>
            <Typography variant="subtitle2" marginTop="0.2rem">
              {movie.overview}
            </Typography>

            <Stack direction={{ xs: "column-reverse", md: "column" }}>
              <Stack direction="row" gap="0.5rem" marginTop="1rem">
                {movie.genres.map((genre) => (
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
            </Stack>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            gap="0.5rem"
            marginBottom="0.5rem"
            marginTop="1rem"
          >
            <Rating value={movie.vote_average! / 2} readOnly />
            <Chip icon={<People />} label={movie.vote_count} size="small" />
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default MovieInfo;
