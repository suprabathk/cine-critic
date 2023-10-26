import MoviePage from "@/pages/movie/[movieID]";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const dummyTitle = "12345678901234567890123456789012345678901";
const dummyDescription =
  "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901";

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("../src/utils/auth-utils", () => ({
  isAuth: jest.fn().mockReturnValue(true),
  getUsername: jest.fn().mockReturnValue("reviewUsername"),
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

const mutationFn = jest.fn();
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
  useMutation: () => ({
    mutate: mutationFn,
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
  it("Renders reviews", async () => {
    render(<MoviePage />);
    await waitFor(() => {
      const heading = screen.getByRole("heading", {
        name: /reviewTitle/i,
      });
      const description = screen.getByText(/reviewDescription/i);
      const username = screen.getByText(/reviewUsername/i);
      expect(heading).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(username).toBeInTheDocument();
    });
  });

  describe("Add review tests", () => {
    it("Add review modal", async () => {
      render(<MoviePage />);
      const addReviewButton = screen.getByRole("button", {
        name: /add review/i,
      });
      await userEvent.click(addReviewButton);
      await waitFor(() => {
        const addReviewTitle = screen.getByRole("heading", {
          name: /add review/i,
        });
        expect(addReviewTitle).toBeInTheDocument();
      });
    });

    it("Submit add review", async () => {
      render(<MoviePage />);
      const addReviewButton = screen.getByRole("button", {
        name: /add review/i,
      });
      await userEvent.click(addReviewButton);
      const reviewTitle = await screen.findByRole("textbox", {
        name: /title/i,
      });
      const reviewDescription = await screen.findByRole("textbox", {
        name: /description/i,
      });
      const reviewRating = await screen.findByLabelText("star-1");
      const submitButton = screen.getByRole("button", {
        name: /submit review/i,
      });

      await userEvent.type(reviewTitle, "1234");
      await userEvent.type(reviewDescription, "1234");
      await userEvent.click(reviewRating);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(mutationFn).toBeCalledTimes(1);
      });
    });

    describe("Rating input tests", () => {
      it("Rating is required", async () => {
        render(<MoviePage />);
        const addReviewButton = screen.getByRole("button", {
          name: /add review/i,
        });
        await userEvent.click(addReviewButton);

        expect(
          screen.queryByRole("heading", {
            name: /rating is required/i,
          })
        ).toBeNull();

        const submitButton = screen.getByRole("button", {
          name: /submit review/i,
        });
        await userEvent.click(submitButton);

        await waitFor(() => {
          expect(
            screen.getByRole("heading", {
              name: /rating is required/i,
            })
          ).toBeInTheDocument();
        });
      });
    });

    describe("Title input tests", () => {
      it("Title is required", async () => {
        render(<MoviePage />);
        const addReviewButton = screen.getByRole("button", {
          name: /add review/i,
        });
        await userEvent.click(addReviewButton);

        expect(screen.queryByText(/title is required/i)).toBeNull();

        const submitButton = screen.getByRole("button", {
          name: /submit review/i,
        });
        await userEvent.click(submitButton);

        await waitFor(() => {
          expect(screen.getByText(/title is required/i)).toBeInTheDocument();
        });
      });

      it("Title cannot be longer than 40", async () => {
        render(<MoviePage />);
        const addReviewButton = screen.getByRole("button", {
          name: /add review/i,
        });
        await userEvent.click(addReviewButton);
        const reviewTitle = await screen.findByRole("textbox", {
          name: /title/i,
        });
        expect(
          screen.queryByText(/title cannot be more than 40 characters/i)
        ).toBeNull();
        await userEvent.type(reviewTitle, dummyTitle);
        const submitButton = screen.getByRole("button", {
          name: /submit review/i,
        });
        await userEvent.click(submitButton);

        await waitFor(() => {
          expect(
            screen.getByText(/title cannot be more than 40 characters/i)
          ).toBeInTheDocument();
        });
      });
    });

    describe("Description input tests", () => {
      it("Description is required", async () => {
        render(<MoviePage />);
        const addReviewButton = screen.getByRole("button", {
          name: /add review/i,
        });
        await userEvent.click(addReviewButton);

        expect(screen.queryByText(/description is required/i)).toBeNull();

        const submitButton = screen.getByRole("button", {
          name: /submit review/i,
        });
        await userEvent.click(submitButton);

        await waitFor(() => {
          expect(
            screen.getByText(/description is required/i)
          ).toBeInTheDocument();
        });
      });

      it("Description cannot be longer than 200", async () => {
        render(<MoviePage />);
        const addReviewButton = screen.getByRole("button", {
          name: /add review/i,
        });
        await userEvent.click(addReviewButton);
        const reviewDescription = await screen.findByRole("textbox", {
          name: /description/i,
        });
        expect(
          screen.queryByText(/description cannot be more than 200 characters/i)
        ).toBeNull();
        await userEvent.type(reviewDescription, dummyDescription);
        const submitButton = screen.getByRole("button", {
          name: /submit review/i,
        });
        await userEvent.click(submitButton);

        await waitFor(() => {
          expect(
            screen.getByText(/description cannot be more than 200 characters/i)
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("Edit review tests", () => {
    it("Edit review modal", async () => {
      render(<MoviePage />);
      const editReviewButton = await screen.findByRole("button", {
        name: /edit/i,
      });
      await userEvent.click(editReviewButton);
      await waitFor(() => {
        const editReviewTitle = screen.getByRole("heading", {
          name: /edit review/i,
        });
        expect(editReviewTitle).toBeInTheDocument();
      });
    });

    it("Submit edit review", async () => {
      render(<MoviePage />);
      const editReviewButton = screen.getByRole("button", {
        name: /edit/i,
      });
      await userEvent.click(editReviewButton);

      const reviewTitle = await screen.findByRole("textbox", {
        name: /title/i,
      });
      const reviewDescription = await screen.findByRole("textbox", {
        name: /description/i,
      });
      const reviewRating = await screen.findByLabelText("star-1");
      const submitButton = screen.getByRole("button", {
        name: /update review/i,
      });

      await userEvent.type(reviewTitle, "1234");
      await userEvent.type(reviewDescription, "1234");
      await userEvent.click(reviewRating);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(mutationFn).toBeCalledTimes(1);
      });
    });

    describe("Title input tests", () => {
      it("Title is required", async () => {
        render(<MoviePage />);
        const editReviewButton = await screen.findByRole("button", {
          name: /edit/i,
        });
        await userEvent.click(editReviewButton);

        expect(screen.queryByText(/title is required/i)).toBeNull();

        const reviewTitle = await screen.findByRole("textbox", {
          name: /title/i,
        });

        await userEvent.clear(reviewTitle);

        const submitButton = screen.getByRole("button", {
          name: /update review/i,
        });
        await userEvent.click(submitButton);

        await waitFor(() => {
          expect(screen.getByText(/title is required/i)).toBeInTheDocument();
        });
      });

      it("Title cannot be longer than 40", async () => {
        render(<MoviePage />);
        const editReviewButton = await screen.findByRole("button", {
          name: /edit/i,
        });
        await userEvent.click(editReviewButton);
        const reviewTitle = await screen.findByRole("textbox", {
          name: /title/i,
        });
        await userEvent.clear(reviewTitle);
        expect(
          screen.queryByText(/title cannot be more than 40 characters/i)
        ).toBeNull();
        await userEvent.type(reviewTitle, dummyTitle);
        const submitButton = screen.getByRole("button", {
          name: /update review/i,
        });
        await userEvent.click(submitButton);

        await waitFor(() => {
          expect(
            screen.getByText(/title cannot be more than 40 characters/i)
          ).toBeInTheDocument();
        });
      });
    });

    describe("Description input tests", () => {
      it("Description is required", async () => {
        render(<MoviePage />);
        const editReviewButton = await screen.findByRole("button", {
          name: /edit/i,
        });
        await userEvent.click(editReviewButton);
        expect(screen.queryByText(/description is required/i)).toBeNull();

        const reviewDescription = await screen.findByRole("textbox", {
          name: /description/i,
        });
        await userEvent.clear(reviewDescription);

        const submitButton = screen.getByRole("button", {
          name: /update review/i,
        });
        await userEvent.click(submitButton);

        await waitFor(() => {
          expect(
            screen.getByText(/description is required/i)
          ).toBeInTheDocument();
        });
      });

      it("Description cannot be longer than 200", async () => {
        render(<MoviePage />);
        const editReviewButton = await screen.findByRole("button", {
          name: /edit/i,
        });
        await userEvent.click(editReviewButton);
        const reviewDescription = await screen.findByRole("textbox", {
          name: /description/i,
        });
        expect(
          screen.queryByText(/description cannot be more than 200 characters/i)
        ).toBeNull();
        await userEvent.clear(reviewDescription);
        await userEvent.type(reviewDescription, dummyDescription);
        const submitButton = screen.getByRole("button", {
          name: /update review/i,
        });
        await userEvent.click(submitButton);

        await waitFor(() => {
          expect(
            screen.getByText(/description cannot be more than 200 characters/i)
          ).toBeInTheDocument();
        });
      });
    });
  });
});
