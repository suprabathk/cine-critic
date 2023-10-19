import { Box, Grid, Skeleton, Stack } from "@mui/material";

const MoviepageSkeleton = () => {
  return (
    <Stack width="100%">
      <Skeleton height="15rem" variant="rounded" />
      <Box paddingLeft="3rem" paddingRight="3rem" paddingBottom="3rem">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Skeleton variant="text" width="10rem" sx={{ marginTop: "1rem" }} />
          <Skeleton variant="text" width="6rem" sx={{ marginTop: "1rem" }} />
        </Stack>
        <Skeleton variant="rounded" height="8rem" sx={{ marginTop: "1rem" }} />
        <Skeleton variant="rounded" height="8rem" sx={{ marginTop: "1rem" }} />
        <Skeleton variant="rounded" height="8rem" sx={{ marginTop: "1rem" }} />
      </Box>
    </Stack>
  );
};

export default MoviepageSkeleton;
