import { useRouter } from "next/router";

const MoviePage = () => {
  const router = useRouter();
  return router.query.movieID;
};

export default MoviePage;
