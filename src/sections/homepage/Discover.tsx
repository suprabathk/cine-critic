import { MoviePreview } from "@/types/movies";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { MoviesSkeleton } from "@/loadingSkeletons/homepage";
import MovieCard from "@/components/homepage/MovieCard";
import useDiscoverQuery from "@/hooks/useDiscoverQuery";

const Discover = () => {
  const discoverQuery = useDiscoverQuery();

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
      {discoverQuery.isLoading ? (
        <MoviesSkeleton />
      ) : (
        <Grid container spacing="1rem">
          {discoverQuery.data.results.map((movie: MoviePreview) => (
            <Grid item key={movie.id} xs={12} md={6} lg={4}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Discover;
