import { Chip, Typography } from "@mui/material";
import authStyles from "@/styles/auth.module.css";

const SignInInfo = () => {
  return (
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
  );
};

export default SignInInfo;
