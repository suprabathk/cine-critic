import { getDiscoverList } from "@/utils/movie-utils";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "@/components/homepage/MovieCard";
import { MoviePreview } from "@/types/movies";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { MoviesSkeleton } from "@/loadingSkeletons/homepage";

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
      {discoverQuery.isLoading ? (
        <MoviesSkeleton />
      ) : (
        <Grid container justifyContent="space-between" gap={2}>
          {discoverQuery.data.results.map((movie: MoviePreview) => (
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
