// eslint-disable-next-line no-unused-vars
import React from "react";
import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact-us.lazy";

const queryClient = new QueryClient();
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

// can submit a contact form
test("can submit a contact form", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify({ success: true }));

  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>,
  );
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  const submitButton = screen.getByRole("button", { name: "Submit" });

  const testData = {
    name: "John Doe",
    email: "8b0d8@example.com",
    message: "Hello, I would like to know more about your products.",
  };
  nameInput.value = testData.name;
  emailInput.value = testData.email;
  messageInput.value = testData.message;
  submitButton.click();

  // Wait for the fetch to be called
  await screen.findByText(/Submitted!/i);
  const request = fetchMocker.requests();
  expect(request).toHaveLength(1);
  expect(request[0].url).toMatch(/\/api\/contact$/);

  expect(fetchMocker).toHaveBeenCalledWith(`/api/contact`, {
    body: JSON.stringify(testData),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
});
