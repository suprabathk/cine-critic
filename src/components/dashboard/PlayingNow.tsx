import { getNowPlayingMoviesList } from "@/utils/movie-utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MovieCard from "@/components/dashboard/MovieCard";
import { MoviePreview } from "@/types/movies";
import Grid from "@mui/material/Grid";
import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import commonStyles from "@/styles/common.module.css";
import Carousel from "react-material-ui-carousel";
import MovieBanner from "./MovieBanner";

const PlayingNow = () => {
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
        Playing now
      </Typography>
      {!nowPlayingQuery.isLoading && (
        <Carousel
          animation="slide"
          cycleNavigation={true}
          navButtonsAlwaysVisible={true}
        >
          {nowPlayingQuery.data.results.map((movie: MoviePreview) => (
            <MovieBanner movie={movie} key={movie.id} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default PlayingNow;
