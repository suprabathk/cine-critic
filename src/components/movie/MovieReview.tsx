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
import { useState } from "react";

const MovieReview = ({
  movieID,
  reviews,
}: {
  movieID: string;
  reviews: Review[];
}) => {
  const queryClient = useQueryClient();

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [addReviewModal, setAddReviewModal] = useState(false);

  const addReviewMutation = useMutation({
    mutationFn: () =>
      addReview(movieID, {
        id: `${new Date().getTime()}`,
        title: reviewTitle,
        description: reviewDescription,
        rating: reviewRating,
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
          <Stack gap="1rem" width="100%">
            <Typography variant="h4">Add review</Typography>
            <Typography variant="subtitle1" lineHeight="0" marginTop="1rem">
              Select a rating
            </Typography>
            <Rating
              size="large"
              value={reviewRating}
              onChange={(e, newValue) => setReviewRating(newValue!)}
            />
            <TextField
              label="Title"
              value={reviewTitle}
              required
              onChange={(e) => setReviewTitle(e.target.value)}
            />
            <TextField
              label="Description"
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              multiline
              minRows="3"
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => addReviewMutation.mutate()}
            >
              Submit review
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default MovieReview;
