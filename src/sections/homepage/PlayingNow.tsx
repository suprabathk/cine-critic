import { MoviePreview } from "@/types/movies";
import { Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import MovieBanner from "../../components/homepage/MovieBanner";
import useNowPlayingQuery from "@/hooks/useNowPlayingQuery";

const PlayingNow = () => {
  const nowPlayingQuery = useNowPlayingQuery();

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
