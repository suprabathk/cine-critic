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
        <h3 className={authStyles.featureTitle}>
          Delivering movie reviews around the globe.
        </h3>
        <Typography component="p">
          Get the live reviews and latest news about Movies, Shows.
        </Typography>
      </div>
      <SignInForm authToken={authToken} router={router} />
    </Stack>
  );
};

export default Signin;
