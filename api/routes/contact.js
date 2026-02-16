import { postContact } from "../controllers/contact.js";

/**
 * Register contact-related routes.
 */
export default async function contactRoutes(server) {
  server.post("/api/contact", postContact);
}
