// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import { Pizza } from "../components/pizza/index";

//  clean up the DOM after each test to prevent memory leaks and ensure a clean state for the next test
afterEach(() => {
  cleanup();
});

// alt test render on image
test("alt test render on image", async () => {
  const name = "My Favorite Pizza";
  const image = "https://picsum.photos/200/200";

  const screen = render(<Pizza name={name} image={image} />);
  const img = screen.getByRole("img");

  expect(img.src).toBe(image);
  expect(img.alt).toBe(name);
});

// to have a default image if no image is provided
test("to have a default image if no image is provided", async () => {
  const name = "My Favorite Pizza";

  const screen = render(<Pizza name={name} />);
  const img = screen.getByRole("img");

  expect(img.src).toBe("https://picsum.photos/200/200");
  expect(img.alt).toBe(name);
});
