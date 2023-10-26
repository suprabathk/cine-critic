import { Review } from "@/types/review";
import { addReview, deleteReview, editReview } from "@/utils/review-utils";
import { DeleteForever, Edit, Person } from "@mui/icons-material";
import {
  Stack,
  Typography,
  Chip,
  Button,
  Box,
  Rating,
  Modal,
  Card,
  CardContent,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { NewReviewForm } from "../../components/movie/NewReviewForm";
import { EditReviewForm } from "../../components/movie/EditReviewForm";

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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="end"
        marginBottom="1rem"
      >
        <Typography
          variant="h5"
          marginTop="1.5rem"
          fontSize="1.7rem"
          fontWeight="600"
        >
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
                <Box>
                  <Typography
                    variant="h5"
                    component="h5"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {review.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    marginBottom="1rem"
                    component="p"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {review.description}
                  </Typography>
                </Box>

                <Stack alignItems={{ sm: "end" }}>
                  <Stack
                    direction="row"
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Rating size="medium" value={review.rating!} readOnly />
                    <Chip icon={<Person />} label={review.username} />
                  </Stack>

                  <Stack
                    direction="row"
                    width="100%"
                    alignItems="center"
                    justifyContent="start"
                    gap="0.4rem"
                    marginTop="1rem"
                  >
                    {review.username === localStorage.getItem("username") && (
                      <>
                        <Box width={{ xs: "100%", sm: "fit-content" }}>
                          <Button
                            size="small"
                            sx={{
                              backgroundColor: "rgba(255, 255, 255, 0.12)",
                              borderRadius: "9999px",
                              paddingLeft: "1rem",
                              paddingRight: "1rem",
                            }}
                            fullWidth
                            color="inherit"
                            onClick={() => {
                              setCurrentEditReview(review);
                              setEditReviewModal(true);
                            }}
                            endIcon={<Edit />}
                          >
                            Edit
                          </Button>
                        </Box>
                        <Box width={{ xs: "100%", sm: "fit-content" }}>
                          <Button
                            sx={{
                              backgroundColor: "rgba(255, 255, 255, 0.12)",
                              borderRadius: "9999px",
                              paddingLeft: "1rem",
                              paddingRight: "1rem",
                            }}
                            fullWidth
                            size="small"
                            color="inherit"
                            onClick={() =>
                              deleteReviewMutation.mutate({
                                reviewID: review.id,
                              })
                            }
                            endIcon={<DeleteForever />}
                          >
                            Delete
                          </Button>
                        </Box>
                      </>
                    )}
                  </Stack>
                </Stack>
              </CardContent>
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
          minWidth={{ xs: "85%", sm: "70%", md: "60%", lg: "50%" }}
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
          minWidth={{ xs: "85%", sm: "70%", md: "60%", lg: "50%" }}
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
