import * as React from "react";
import { MoviePreview } from "@/types/movies";
import { useRouter } from "next/router";
import movieStyles from "@/styles/movie.module.css";
import { CalendarMonthOutlined, People } from "@mui/icons-material";
import { Stack, Typography, Chip, Rating } from "@mui/material";

export default function MovieBanner(props: { movie: MoviePreview }) {
  const router = useRouter();
  const {
    id,
    title,
    overview,
    poster_path,
    backdrop_path,
    adult,
    release_date,
    vote_average,
    vote_count,
  } = props.movie;

  return (
    <div
      className={movieStyles.movieBanner}
      onClick={() => router.push(`/movie/${id}`)}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${process.env.NEXT_PUBLIC_TMDB_API_IMAGES}/${backdrop_path})`,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <img
          src={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGES}/${poster_path}`}
          alt="poster"
          className={movieStyles.bannerPoster}
        />
        <Stack height="100%" alignItems="start" marginLeft="2rem">
          <Typography
            variant="h4"
            fontWeight="600"
            textAlign="center"
            marginTop="1rem"
            lineHeight="1.5rem"
          >
            {title}
          </Typography>
          <Typography variant="body2" marginTop="0.6rem">
            {overview}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
            marginTop="1rem"
          >
            <Chip
              label={release_date}
              icon={<CalendarMonthOutlined />}
              size="small"
            />
            <Stack direction="row" alignItems="center" gap="0.5rem">
              <Rating size="small" value={vote_average! / 2} readOnly />
              <Chip icon={<People />} label={vote_count} size="small" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
