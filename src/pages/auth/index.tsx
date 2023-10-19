import { useEffect, useState } from "react";
import { getAuthToken, isAuth } from "@/utils/auth-utils";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import SignInForm from "@/sections/auth/SignInForm";
import SignInInfo from "@/sections/auth/SignInInfo";

const Signin = () => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    getAuthToken().then((data) => setAuthToken(data));
    isAuth() && router.push("/");
  }, [router]);

  return (
    <Stack direction="row" height="100vh">
      <SignInInfo />
      <SignInForm authToken={authToken} router={router} />
    </Stack>
  );
};

export default Signin;
