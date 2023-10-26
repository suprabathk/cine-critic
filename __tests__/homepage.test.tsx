import MovieBanner from "@/components/homepage/MovieBanner";
import ActionAreaCard from "@/components/homepage/MovieCard";
import Discover from "@/sections/homepage/Discover";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

afterEach(() => {
  jest.clearAllMocks();
});

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

jest.mock("../src/utils/auth-utils", () => ({
  isAuth: jest.fn().mockReturnValue(true),
}));

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));

jest.mock("../src/hooks/useDiscoverQuery", () => ({
  useDiscoverQuery: jest.fn().mockReturnValue({
    data: {
      results: [
        {
          adult: false,
          backdrop_path: "string",
          genre_ids: [],
          id: 1,
          original_language: "original_language",
          original_title: "original_title",
          overview: "overview",
          popularity: 0,
          poster_path: "",
          release_date: "release_date",
          title: "title",
          vote_average: 0,
          vote_count: 0,
        },
      ],
    },
    isLoading: false,
    error: {},
  }),
}));

describe("Homepage tests", () => {
  it("Snapshot testing", async () => {
    let tree;
    await act(async () => {
      tree = renderer.create(<Discover />);
    });
    expect(tree!.toJSON()).toMatchSnapshot();
  });

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
      const movieCard = container.getElementsByClassName("movieCardAction")[0];
      await userEvent.click(movieCard);
      await waitFor(() => {
        expect(pushMock).toBeCalledWith("/movie/0");
      });
    });
  });
});
