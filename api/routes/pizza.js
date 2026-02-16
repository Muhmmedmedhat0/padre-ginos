import { getPizzas, getPizzaOfTheDay } from "../controllers/pizza.js";

/**
 * Register pizza-related routes.
 */
export default async function pizzaRoutes(server) {
  server.get("/api/pizzas", getPizzas);
  server.get("/api/pizza-of-the-day", getPizzaOfTheDay);
}
