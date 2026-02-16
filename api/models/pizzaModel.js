import db from "../db.js";

/**
 * Fetch all pizza types from the database.
 */
export async function getAllPizzaTypes() {
  return db.all(
    "SELECT pizza_type_id, name, category, ingredients as description FROM pizza_types",
  );
}

/**
 * Fetch all pizza sizes and prices.
 */
export async function getAllPizzaSizes() {
  return db.all(
    `SELECT 
      pizza_type_id as id, size, price
    FROM 
      pizzas`,
  );
}

/**
 * Fetch sizes and prices for a specific pizza type.
 */
export async function getSizesByPizzaTypeId(pizzaTypeId) {
  return db.all(
    `SELECT
      size, price
    FROM
      pizzas
    WHERE
      pizza_type_id = ?`,
    [pizzaTypeId],
  );
}
