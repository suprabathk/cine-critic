import Head from "next/head";
import NowPlaying from "@/components/dashboard/NowPlaying";
import { Box, CircularProgress } from "@mui/material";
import Discover from "@/components/dashboard/Discover";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    !localStorage.getItem("authToken")
      ? router.push("/auth")
      : setAuthorized(true);
  }, [router]);

  return (
    <>
      <Head>
        <title>CineCritic</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {authorized ? (
          <>
            <Box paddingLeft="3rem" paddingRight="3rem" paddingBottom="3rem">
              <NowPlaying />
              <Discover />
            </Box>
          </>
        ) : (
          <Box
            minHeight="100vh"
            width="100vw"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress color="error" />
          </Box>
        )}
      </main>
    </>
  );
}
