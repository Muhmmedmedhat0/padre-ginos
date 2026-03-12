// eslint-disable-next-line no-unused-vars
import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ContactUs } from "../components/contact-us/index";

export const Route = createLazyFileRoute("/contact-us")({
  component: () => <ContactUs />,
});
