import React from "react";
import renderer from "react-test-renderer";
import SignIn from "@/pages/auth/index";

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

it("Snapshot testing", () => {
  const tree = renderer.create(<SignIn />).toJSON();
  expect(tree).toMatchSnapshot();
});
