// eslint-disable-next-line no-unused-vars
import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { Cart } from "../components/shared/cart";

// snapshot with nothing in cart to make sure the component renders correctly with an empty cart
test("snapshot with nothing in cart", () => {
  const { asFragment } = render(<Cart cart={[]} checkout={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});
