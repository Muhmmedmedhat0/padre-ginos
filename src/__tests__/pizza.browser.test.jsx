// eslint-disable-next-line no-unused-vars
import React from "react";
import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import { page } from "vitest/browser";
import { Pizza } from "../components/pizza/index";

test("alt text renders on image", async () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  render(<Pizza name={name} description="super cool pizza" image={src} />);

  const img = page.getByRole("img");

  await expect.element(img).toBeInTheDocument();
  await expect.element(img).toHaveAttribute("src", src);
  await expect.element(img).toHaveAttribute("alt", name);
});
