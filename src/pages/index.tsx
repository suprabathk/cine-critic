import { Box } from "@mui/material";
import Discover from "@/sections/homepage/Discover";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PlayingNow from "@/sections/homepage/PlayingNow";
import { HomepageSkeleton } from "@/loadingSkeletons/homepage";

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
      <main>
        {authorized ? (
          <>
            <Box
              paddingLeft={{ xs: "1rem", sm: "3rem" }}
              paddingRight={{ xs: "1rem", sm: "3rem" }}
              paddingBottom={{ xs: "1rem", sm: "3rem" }}
            >
              <PlayingNow />
              <Discover />
            </Box>
          </>
        ) : (
          <HomepageSkeleton />
        )}
      </main>
    </>
  );
}
