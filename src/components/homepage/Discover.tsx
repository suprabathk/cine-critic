import { getDiscoverList, getNowPlayingMoviesList } from "@/utils/auth-utils";
import { useQuery, useQueryClient } from "react-query";
import MovieCard from "@/components/homepage/MovieCard";
import { Movie } from "@/types/movies";
import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";
import commonStyles from "@/styles/common.module.css";
import { Lexend_Deca } from "next/font/google";

const lexend_Deca = Lexend_Deca({ subsets: ["latin"] });

const Discover = () => {
  const discoverQuery = useQuery({
    queryFn: getDiscoverList,
    queryKey: ["discover"],
  });

  return (
    <div style={{ width: "100%", marginTop: "2rem" }}>
      <Typography
        variant="h4"
        component="h4"
        fontWeight={700}
        lineHeight="2.25rem"
        fontSize="1.5rem;"
        color="inherit"
        marginBottom="0.5rem"
        className={lexend_Deca.className}
      >
        Discover
      </Typography>
      {!discoverQuery.isLoading && (
        <Grid container justifyContent="space-between" gap={2}>
          {discoverQuery.data.results.map((movie: Movie) => (
            <Grid key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Discover;
