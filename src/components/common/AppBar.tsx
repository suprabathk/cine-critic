import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Logo from "./Logo";

const MyAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Container>
            <Logo />
          </Container>
          <Button color="error" sx={{ whiteSpace: "nowrap" }}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MyAppBar;
