import { Review, ReviewForm } from "@/types/review";
import { addReview, deleteReview, editReview } from "@/utils/review-utils";
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
import { NewReviewForm } from "./NewReviewForm";
import { EditReviewForm } from "./EditReviewForm";

const MovieReview = ({
  movieID,
  reviews,
}: {
  movieID: string;
  reviews: Review[];
}) => {
  const queryClient = useQueryClient();
  const [addReviewModal, setAddReviewModal] = useState(false);
  const [editReviewModal, setEditReviewModal] = useState(false);
  const [currentEditReview, setCurrentEditReview] = useState<
    Review | undefined
  >();

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

  const editReviewMutation = useMutation({
    mutationFn: ({ review }: { review: Review }) => editReview(movieID, review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", movieID] });
      setEditReviewModal(false);
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
                    <Rating size="medium" value={review.rating!} readOnly />
                  </Box>
                  <Chip icon={<Person />} label={review.username} />
                </Stack>
              </CardContent>
              {review.username === localStorage.getItem("username") && (
                <CardActions>
                  <Button
                    onClick={() => {
                      setCurrentEditReview(review);
                      setEditReviewModal(true);
                    }}
                  >
                    Edit
                  </Button>
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
          <NewReviewForm
            handleSubmit={(values) => {
              addReviewMutation.mutate({
                title: values.title,
                description: values.description,
                rating: values.rating,
              });
            }}
          />
        </Box>
      </Modal>
      <Modal
        open={editReviewModal}
        onClose={() => setEditReviewModal(false)}
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
          {currentEditReview && (
            <EditReviewForm
              handleSubmit={(values) => {
                editReviewMutation.mutate({
                  review: {
                    ...currentEditReview,
                    title: values.title,
                    description: values.description,
                    rating: values.rating,
                  },
                });
                setEditReviewModal(false);
              }}
              review={currentEditReview}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MovieReview;
