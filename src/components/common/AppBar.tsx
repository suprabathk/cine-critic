import { AppBar, Box, Button, Container, Stack, Toolbar } from "@mui/material";
import Logo from "./Logo";
import { useRouter } from "next/router";

const MyAppBar = () => {
  const router = useRouter();

  const signout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    router.push("/auth");
  };

  return (
    <AppBar
      position="sticky"
      // color="transparent"
      elevation={0}
      // sx={{ backdropFilter: "blur(8px)" }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        paddingLeft={{ xs: "1rem", sm: "3rem" }}
        paddingRight={{ xs: "1rem", sm: "3rem" }}
        paddingTop="1rem"
        paddingBottom="1rem"
      >
        <Logo />
        <Button color="error" sx={{ whiteSpace: "nowrap" }} onClick={signout}>
          Sign out
        </Button>
      </Stack>
    </AppBar>
  );
};

export default MyAppBar;
