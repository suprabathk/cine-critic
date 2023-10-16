import { Grid, Skeleton, Stack } from "@mui/material";

export const TextSkeleton = () => (
  <Skeleton width="20%" variant="text" sx={{ marginBottom: "0.5rem" }} />
);

export const PlayingNowSkeleton = () => (
  <Skeleton variant="rounded" height={200} />
);

export const MoviesSkeleton = () => (
  <Grid container justifyContent="space-between" gap={2}>
    {Array(6)
      .fill(1)
      .map((x, id) => (
        <Skeleton variant="rounded" height={200} width={370} key={id} />
      ))}
  </Grid>
);

export const DashboardSkeleton = () => {
  return (
    <Stack paddingLeft="3rem" paddingRight="3rem" paddingBottom="3rem">
      <TextSkeleton />
      {/* <PlayingNowSkeleton /> */}
      <Skeleton
        width="20%"
        variant="text"
        sx={{ marginTop: "2rem", marginBottom: "0.5rem" }}
      />
      <MoviesSkeleton />
    </Stack>
  );
};
