import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, Rating, Stack } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Movie } from "@/types/movies";
import { Lexend_Deca } from "next/font/google";
import movie from "@/styles/movie.module.css";
import { CalendarMonthOutlined } from "@mui/icons-material";

const lexend_Deca = Lexend_Deca({ subsets: ["latin"] });

export default function ActionAreaCard(props: { movie: Movie }) {
  const {
    title,
    overview,
    poster_path,
    adult,
    release_date,
    vote_average,
    vote_count,
  } = props.movie;

  return (
    <Card sx={{ maxWidth: 370 }} className={movie.movieCard}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGES}${poster_path}`}
          alt="Poster"
        />
        {adult && (
          <Chip label="18+" className={movie.contentChip} color="error" />
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textOverflow="ellipsis"
            whiteSpace="pre"
            overflow="hidden"
            marginBottom={0}
            fontWeight={400}
            fontSize="1.2rem"
            className={lexend_Deca.className}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            className={lexend_Deca.className}
          >
            {overview}
          </Typography>
          <Stack
            direction="row"
            alignItems="end"
            justifyContent="space-between"
          >
            <Chip
              icon={<CalendarMonthOutlined />}
              label={release_date}
              variant="filled"
              size="small"
              style={{ marginTop: "1rem" }}
            />
            <Stack direction="row">
              <Rating value={vote_average / 2} readOnly />
              <Chip label={vote_count} size="small" />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
