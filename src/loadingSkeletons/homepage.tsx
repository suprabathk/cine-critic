import { Grid, Skeleton, Stack } from "@mui/material";

export const TextSkeleton = () => (
  <Skeleton width="20%" variant="text" sx={{ marginBottom: "0.5rem" }} />
);

export const MoviesSkeleton = () => (
  <Grid container spacing="1rem">
    {Array(6)
      .fill(1)
      .map((x, id) => (
        <Grid item key={id} xs={12} md={6} lg={4}>
          <Skeleton variant="rounded" height={200} />
        </Grid>
      ))}
  </Grid>
);

export const HomepageSkeleton = () => {
  return (
    <Stack paddingLeft="3rem" paddingRight="3rem" paddingBottom="3rem">
      <TextSkeleton />
      <Skeleton
        width="20%"
        variant="text"
        sx={{ marginTop: "2rem", marginBottom: "0.5rem" }}
      />
      <MoviesSkeleton />
    </Stack>
  );
};
