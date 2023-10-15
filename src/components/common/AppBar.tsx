import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import Logo from "./Logo";
import { useRouter } from "next/router";

const MyAppBar = () => {
  const router = useRouter();

  const signout = () => {
    localStorage.removeItem("authToken");
    router.push("/auth");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ backdropFilter: "blur(30px)" }}
      >
        <Toolbar>
          <Container>
            <Logo />
          </Container>
          <Button color="error" sx={{ whiteSpace: "nowrap" }} onClick={signout}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MyAppBar;
