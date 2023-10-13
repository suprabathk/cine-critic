import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Movie } from "@/types/movies";
import { Lexend_Deca } from "next/font/google";

const lexend_Deca = Lexend_Deca({ subsets: ["latin"] });

export default function ActionAreaCard(props: { movie: Movie }) {
  const { title, overview, poster_path } = props.movie;
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${process.env.NEXT_PUBLIC_TMDB_API_IMAGES}${poster_path}`}
          alt="Poster"
        />
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
