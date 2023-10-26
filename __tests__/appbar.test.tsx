import MyAppBar from "@/components/common/AppBar";
import { signOut } from "@/utils/auth-utils";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../src/utils/auth-utils", () => ({
  signOut: jest.fn(),
}));

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));

describe("Appbar tests", () => {
  describe("Signout button", () => {
    it("Signout button rendered", async () => {
      render(<MyAppBar />);
      const signOutButton = screen.queryByRole("button", {
        name: /sign out/i,
      });
      await waitFor(() => {
        expect(signOutButton).toBeInTheDocument();
      });
    });

    it("Signout button", async () => {
      render(<MyAppBar />);
      const signOutButton = screen.getByRole("button", {
        name: /sign out/i,
      });
      await userEvent.click(signOutButton);
      await waitFor(() => {
        expect(signOut).toBeCalledTimes(1);
        expect(pushMock).toBeCalledTimes(1);
        expect(pushMock).toBeCalledWith("/auth");
      });
    });
  });
});
