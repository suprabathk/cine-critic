import { ReviewForm } from "@/types/review";
import {
  Stack,
  Typography,
  Box,
  Rating,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import commonStyles from "@/styles/common.module.css";

export const NewReviewForm = ({
  handleSubmit,
}: {
  handleSubmit: (values: ReviewForm) => void;
}) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      rating: 0,
    },
    validate(values) {
      const errors: {
        title?: string;
        description?: string;
        rating?: string;
      } = {};

      if (!values.rating) {
        errors.rating = "Rating is required";
      }
      if (!values.title) {
        errors.title = "Title is required";
      }
      if (!values.description) {
        errors.description = "Description is required";
      }
      return errors;
    },
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
      <Stack gap="1rem" width="100%">
        <Typography variant="h4">Add review</Typography>
        <Typography variant="subtitle1" lineHeight="0" marginTop="1rem">
          Select a rating
        </Typography>
        <Box>
          <Rating
            size="large"
            name="rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Typography variant="subtitle2" color="red">
            {formik.errors.rating}
          </Typography>
        </Box>
        <TextField
          label="Title"
          name="title"
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          multiline
          minRows="3"
          maxRows="5"
        />
        <Button variant="contained" color="error" type="submit">
          Submit review
        </Button>
      </Stack>
    </form>
  );
};
