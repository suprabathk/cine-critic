import authStyles from "@/styles/auth.module.css";
import SignInForm from "@/components/auth/SignInForm";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/utils/auth-utils";
import { useRouter } from "next/router";
import { Chip, Stack, Typography } from "@mui/material";

const Signin = () => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    getAuthToken().then((data) => setAuthToken(data));
  }, []);

  return (
    <Stack direction="row" height="100vh">
      <div className={authStyles.authInfo}>
        <Chip label="Movies, Shows and more" color="error" size="small" />
        <Typography
          variant="h3"
          component="h3"
          fontSize="1.85rem"
          lineHeight="2.25rem"
          fontWeight="600"
        >
          Delivering movie reviews around the globe.
        </Typography>
        <Typography component="p">
          Get the live reviews and latest news about Movies, Shows.
        </Typography>
      </div>
      <SignInForm authToken={authToken} router={router} />
    </Stack>
  );
};

export default Signin;
