import MoviePage from "@/pages/movie/[movieID]";
import { render, screen, waitFor, renderHook } from "@testing-library/react";

jest.mock("../src/utils/auth-utils", () => ({
  isAuth: jest.fn().mockReturnValue(true),
}));

jest.mock("../src/hooks/useReviewsQuery", () => ({
  useReviewsQuery: jest.fn().mockReturnValue({
    data: [
      {
        id: "1",
        title: "reviewTitle",
        description: "reviewDescription",
        rating: 0,
        username: "reviewUsername",
      },
    ],
    isLoading: false,
    error: {},
  }),
}));

jest.mock("../src/hooks/useMovieQuery", () => ({
  useMovieQuery: jest.fn().mockReturnValue({
    data: {
      adult: false,
      backdrop_path: "",
      genre_ids: [],
      id: "1",
      original_language: "",
      original_title: "",
      overview: "overview",
      popularity: 0,
      poster_path: "",
      release_date: "release",
      title: "title",
      vote_average: 0,
      vote_count: 0,
      genres: [],
      production_companies: [],
      revenue: 0,
      budget: 0,
      runtime: 0,
      tagline: "tagline",
    },
    isLoading: false,
    error: {},
  }),
}));

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
  useMutation: () => ({
    mutate: jest.fn(),
  }),
}));

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: pushMock,
      query: { movieID: "1" },
    };
  },
}));

describe("Moviepage tests", () => {
  describe("Reviews tests", () => {
    it("Renders reviews", async () => {
      render(<MoviePage />);
      await waitFor(() => {
        const heading = screen.getByRole("heading", {
          name: /reviewTitle/i,
        });
        const username = screen.getByText(/reviewUsername/i);
        expect(heading).toBeInTheDocument();
        expect(username).toBeInTheDocument();
      });
    });
  });
});
