import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { Pizza } from "../components/pizza/index";

test("alt test render on image", async () => {
  const name = "My Favorite Pizza";
  const image = "https://picsum.photos/200/200";

  const screen = render(<Pizza name={name} image={image} />);
  const img = screen.getByRole("img");

  expect(img.src).toBe(image);
  expect(img.alt).toBe(name);
});
