import { Review } from "@/types/review";
import { addReview, deleteReview } from "@/utils/review-utils";
import { Person } from "@mui/icons-material";
import {
  Stack,
  Typography,
  Chip,
  Button,
  Box,
  Rating,
  Modal,
  TextField,
  Link,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, useFormik } from "formik";
import { useState } from "react";

const MovieReview = ({
  movieID,
  reviews,
}: {
  movieID: string;
  reviews: Review[];
}) => {
  const queryClient = useQueryClient();
  const [addReviewModal, setAddReviewModal] = useState(false);

  const addReviewMutation = useMutation({
    mutationFn: ({
      title,
      description,
      rating,
    }: {
      title: string;
      description: string;
      rating: number;
    }) =>
      addReview(movieID, {
        id: `${new Date().getTime()}`,
        title: title,
        description: description,
        rating: rating,
        username: localStorage.getItem("username") ?? "Anonymus",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", movieID] });
      setAddReviewModal(false);
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: ({ reviewID }: { reviewID: string }) =>
      deleteReview(movieID, reviewID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", movieID] });
    },
  });

  const WithMaterialUI = () => {
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
      onSubmit: (values) => {
        addReviewMutation.mutate({
          title: values.title,
          description: values.description,
          rating: values.rating,
        });
      },
    });

    return (
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <Stack gap="1rem" width="100%">
          <Typography variant="h4">Add review</Typography>
          <Typography variant="subtitle1" lineHeight="0" marginTop="1rem">
            Select a rating
          </Typography>
          <Box>
            <Typography variant="subtitle2" color="red">
              {formik.errors.rating}
            </Typography>
            <Rating
              size="large"
              name="rating"
              value={formik.values.rating}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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
          />
          <Button variant="contained" color="error" type="submit">
            Submit review
          </Button>
        </Stack>
      </form>
    );
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="end">
        <Typography variant="h4" marginTop="1rem">
          Reviews
        </Typography>
        <Button
          onClick={() => setAddReviewModal(true)}
          variant="contained"
          color="error"
          size="small"
        >
          Add review
        </Button>
      </Stack>
      <Stack marginTop="0.5rem" gap="0.5rem">
        {movieID &&
          reviews.map((review: Review) => (
            <Card key={review.id} sx={{ borderRadius: "1rem" }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="start"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h5">{review.title}</Typography>
                    <Typography variant="subtitle2">
                      {review.description}
                    </Typography>
                    <Rating size="medium" value={review.rating! / 2} readOnly />
                  </Box>
                  <Chip icon={<Person />} label={review.username} />
                </Stack>
              </CardContent>
              {review.username === localStorage.getItem("username") && (
                <CardActions>
                  <Button>Edit</Button>
                  <Button
                    color="error"
                    onClick={() =>
                      deleteReviewMutation.mutate({ reviewID: review.id })
                    }
                  >
                    Delete
                  </Button>
                </CardActions>
              )}
            </Card>
          ))}
      </Stack>
      {reviews.length === 0 && (
        <>
          <Typography variant="body2">No reviews yet</Typography>
        </>
      )}
      <Modal
        open={addReviewModal}
        onClose={() => setAddReviewModal(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          bgcolor="#28282B"
          display="flex"
          boxSizing="border-box"
          alignItems="center"
          justifyContent="center"
          padding="2rem"
          borderRadius="20px"
          minWidth="40%"
        >
          <WithMaterialUI />
        </Box>
      </Modal>
    </>
  );
};

export default MovieReview;
