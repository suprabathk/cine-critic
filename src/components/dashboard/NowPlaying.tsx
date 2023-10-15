import { getNowPlayingMoviesList } from "@/utils/movie-utils";
import { useQuery, useQueryClient } from "react-query";
import MovieCard from "@/components/dashboard/MovieCard";
import { MoviePreview } from "@/types/movies";
import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";
import commonStyles from "@/styles/common.module.css";

const NowPlaying = () => {
  const nowPlayingQuery = useQuery({
    queryFn: getNowPlayingMoviesList,
    queryKey: ["nowPlaying"],
  });

  return (
    <div style={{ width: "100%" }}>
      <Typography
        variant="h4"
        component="h4"
        fontWeight={700}
        lineHeight="2.25rem"
        fontSize="1.5rem;"
        color="inherit"
        marginBottom="0.5rem"
      >
        Now playing
      </Typography>
      {!nowPlayingQuery.isLoading && (
        <Stack
          direction="row"
          overflow="auto"
          marginRight="-3rem"
          paddingBottom="0.5rem"
          gap={2}
          className={`${commonStyles.customScrollbar}`}
        >
          {nowPlayingQuery.data.results.map((movie: MoviePreview) => (
            <Grid key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Stack>
      )}
    </div>
  );
};

export default NowPlaying;
