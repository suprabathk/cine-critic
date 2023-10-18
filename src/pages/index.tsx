import { Box } from "@mui/material";
import Discover from "@/components/homepage/Discover";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PlayingNow from "@/components/homepage/PlayingNow";
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
            <Box paddingLeft="3rem" paddingRight="3rem" paddingBottom="3rem">
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
