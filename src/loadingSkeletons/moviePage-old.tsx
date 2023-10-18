import { Grid, Skeleton, Stack } from "@mui/material";

const MoviePageSkeleton = () => {
  return (
    <Stack
      marginTop="2rem"
      direction={{ xs: "column", sm: "row" }}
      width="100%"
    >
      <Stack>
        <Skeleton height="50vh" variant="rounded" />
        <Skeleton variant="text" sx={{ marginTop: "1rem" }} />
        <Skeleton variant="text" width="17vw" />
      </Stack>
      <Stack marginLeft={{ sm: "2rem" }} marginTop={{ xs: "2rem", sm: "0" }}>
        <Skeleton variant="text" width="20vw" />
        <Skeleton variant="text" width="70vw" />
        <Skeleton variant="text" width="70vw" />
        <Skeleton variant="text" width="70vw" />
        <Skeleton variant="text" width="20vw" sx={{ marginTop: "2rem" }} />
        <Stack direction="row" gap="1rem" marginTop="0.5rem">
          <Skeleton variant="rounded" width="10vw" />
          <Skeleton variant="rounded" width="10vw" />
          <Skeleton variant="rounded" width="10vw" />
          <Skeleton variant="rounded" width="10vw" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MoviePageSkeleton;
