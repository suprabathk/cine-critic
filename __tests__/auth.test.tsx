import React from "react";
import renderer from "react-test-renderer";
import SignIn from "@/pages/auth/index";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn } from "@/utils/auth-utils";

jest.mock("../src/utils/auth-utils", () => ({
  getAuthToken: jest.fn().mockResolvedValue(""),
  isAuth: jest.fn().mockReturnValue(true),
  signIn: jest.fn().mockResolvedValue({ data: { success: true } }),
}));

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: { movieID: "" },
      push: jest.fn(),
    };
  },
}));

describe("Auth page tests", () => {
  it("Snapshot testing", () => {
    const tree = renderer.create(<SignIn />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders correctly", async () => {
    render(<SignIn />);
    const submit = screen.getByRole("button", {
      name: /sign in/i,
    });
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(submit).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  describe("Username tests", () => {
    it("Username is required", async () => {
      render(<SignIn />);
      const submit = screen.getByRole("button", {
        name: /sign in/i,
      });
      //No errors initially
      expect(screen.queryByText(/username is required/i)).toBeNull();

      await userEvent.click(submit);
      //Calling fucntion after click
      await waitFor(() => {
        expect(screen.queryByText(/username is required/i)).toBeInTheDocument();
        expect(signIn).toBeCalledTimes(0);
      });
    });

    it("Username should be atleast 8 characters long", async () => {
      render(<SignIn />);
      const submit = screen.getByRole("button", {
        name: /sign in/i,
      });
      //No errors initially
      expect(
        screen.queryByText(/username should be minimum of 8 characters/i)
      ).toBeNull();
      const usernameInput = screen.getByLabelText(/username/i);
      await userEvent.type(usernameInput, "123456");

      await userEvent.click(submit);

      //Errors after click
      await waitFor(() => {
        expect(
          screen.queryByText(/username should be minimum of 8 characters/i)
        ).toBeInTheDocument();
        expect(signIn).toBeCalledTimes(0);
      });
    });

    it("Username cannot contain special symbols", async () => {
      render(<SignIn />);
      const submit = screen.getByRole("button", {
        name: /sign in/i,
      });
      //No errors initially
      expect(
        screen.queryByText(/username can contain only letters and numbers/i)
      ).toBeNull();

      const usernameInput = screen.getByLabelText(/username/i);
      await userEvent.type(usernameInput, "1234567890#$");
      await userEvent.click(submit);
      //Calling fucntion after click
      await waitFor(() => {
        expect(
          screen.getByText(/username can contain only letters and numbers/i)
        ).toBeInTheDocument();
        expect(signIn).toBeCalledTimes(0);
      });
    });
  });

  describe("Password tests", () => {
    it("Password is required", async () => {
      render(<SignIn />);
      const submit = screen.getByRole("button", {
        name: /sign in/i,
      });
      //No errors initially
      expect(screen.queryByText(/password is required/i)).toBeNull();

      await userEvent.click(submit);
      //Calling fucntion after click
      await waitFor(() => {
        expect(screen.queryByText(/password is required/i)).toBeInTheDocument();
        expect(signIn).toBeCalledTimes(0);
      });
    });

    it("Password should be atleast 8 characters long", async () => {
      render(<SignIn />);
      const submit = screen.getByRole("button", {
        name: /sign in/i,
      });
      //No errors initially
      expect(
        screen.queryByText(/password should be minimum of 8 characters/i)
      ).toBeNull();
      const passwordInput = screen.getByLabelText(/password/i);
      await userEvent.type(passwordInput, "123456");

      await userEvent.click(submit);

      //Errors after click
      await waitFor(() => {
        expect(
          screen.queryByText(/password should be minimum of 8 characters/i)
        ).toBeInTheDocument();
        expect(signIn).toBeCalledTimes(0);
      });
    });

    it("Password cannot contain spaces", async () => {
      render(<SignIn />);
      const submit = screen.getByRole("button", {
        name: /sign in/i,
      });
      //No errors initially
      expect(screen.queryByText(/password cannot contain spaces/i)).toBeNull();

      const passwordInput = screen.getByLabelText(/password/i);
      await userEvent.type(passwordInput, "123456 78");

      await userEvent.click(submit);
      //Calling fucntion after click
      await waitFor(() => {
        expect(
          screen.queryByText(/password cannot contain spaces/i)
        ).toBeInTheDocument();
        expect(signIn).toBeCalledTimes(0);
      });
    });
  });

  it("Submitting the form", async () => {
    render(<SignIn />);
    const submit = screen.getByRole("button", {
      name: /sign in/i,
    });
    //No errors initially
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(usernameInput, "1234567890");
    await userEvent.type(passwordInput, "1234567890");
    await userEvent.click(submit);
    //Calling fucntion after click
    await waitFor(() => {
      expect(signIn).toBeCalledTimes(1);
    });
  });
});
