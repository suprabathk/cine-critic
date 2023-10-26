import MovieBanner from "@/components/homepage/MovieBanner";
import ActionAreaCard from "@/components/homepage/MovieCard";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const dummyMovieData = {
  adult: false,
  backdrop_path: "",
  genre_ids: [],
  id: 0,
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  release_date: "",
  title: "movieTitle",
  vote_average: 0,
  vote_count: 0,
};

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));

describe("Homepage tests", () => {
  describe("Movie banner tests", () => {
    it("Redirect on click", async () => {
      render(<MovieBanner movie={dummyMovieData} />);
      const titleText = screen.getByRole("heading", {
        name: /movieTitle/i,
      });
      await userEvent.click(titleText);
      await waitFor(() => {
        expect(pushMock).toBeCalledTimes(1);
        expect(pushMock).toBeCalledWith("/movie/0");
      });
    });
  });

  describe("Movie card tests", () => {
    it("Redirect on click", async () => {
      const { container } = render(<ActionAreaCard movie={dummyMovieData} />);
      const movieCard = container.getElementsByClassName("movieCard")[0];
      await userEvent.click(movieCard);
      await waitFor(() => {
        expect(pushMock).toBeCalledTimes(1);
        expect(pushMock).toBeCalledWith("/movie/0");
      });
    });
  });
});
