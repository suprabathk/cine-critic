import { getDiscoverList } from "@/utils/auth-utils";
import { useQuery } from "react-query";
import MovieCard from "@/components/homepage/MovieCard";
import { Movie } from "@/types/movies";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

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
