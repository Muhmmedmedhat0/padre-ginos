import { createLazyFileRoute } from "@tanstack/react-router";
import { ContactUs } from "../components/contact-us/index";

export const Route = createLazyFileRoute("/contact-us")({
  component: () => <ContactUs />,
});
