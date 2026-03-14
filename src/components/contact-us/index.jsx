// eslint-disable-next-line no-unused-vars
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { PostContact } from "../../api/contact";

export function ContactUs() {
  const mutation = useMutation({
    mutationKey: "contact-us",
    mutationFn: (formData) => {
      "use server";
      const data = Object.fromEntries(formData.entries());
      console.log(data);
      return PostContact(data);
    },
  });
  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        <form action={mutation.mutate}>
          <input
            id="name"
            name="name"
            placeholder="Name"
            required
            aria-label="name"
          />

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
            aria-label="email"
          />

          <textarea
            id="message"
            placeholder="message"
            name="message"
            required
            aria-label="message"
          ></textarea>

          <button type="submit" disabled={mutation.isLoading}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
