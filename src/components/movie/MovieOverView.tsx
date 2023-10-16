import { MovieDetails } from "@/types/movies";
import { Typography, Stack, Chip } from "@mui/material";

const MovieOverview = ({ movie }: { movie: MovieDetails }) => {
  return (
    <>
      <Typography variant="h4">Overview</Typography>
      <Typography variant="body2">{movie.overview}</Typography>
      <Typography variant="h4" marginTop="1rem">
        Genre
      </Typography>
      <Stack direction="row" gap="0.5rem">
        {movie.genres.map((genre) => (
          <Chip label={genre.name} key={genre.id} />
        ))}
      </Stack>
    </>
  );
};

export default MovieOverview;
