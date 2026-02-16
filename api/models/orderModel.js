import db from "../db.js";

/**
 * Fetch all orders.
 */
export async function getAllOrders() {
  return db.all("SELECT order_id, date, time FROM orders");
}

/**
 * Fetch a single order by ID.
 */
export async function getOrderById(orderId) {
  return db.get("SELECT order_id, date, time FROM orders WHERE order_id = ?", [
    orderId,
  ]);
}

/**
 * Fetch order items (with pizza details) by order ID.
 */
export async function getOrderItemsByOrderId(orderId) {
  return db.all(
    `SELECT 
      t.pizza_type_id as pizzaTypeId, t.name, t.category, t.ingredients as description, o.quantity, p.price, o.quantity * p.price as total, p.size
    FROM 
      order_details o
    JOIN
      pizzas p
    ON
      o.pizza_id = p.pizza_id
    JOIN
      pizza_types t
    ON
      p.pizza_type_id = t.pizza_type_id
    WHERE 
      order_id = ?`,
    [orderId],
  );
}

/**
 * Create a new order and return the order ID.
 * Runs inside a transaction.
 */
export async function createOrder(cart) {
  await db.run("BEGIN TRANSACTION");

  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour12: false });
  const date = now.toISOString().split("T")[0];

  const result = await db.run("INSERT INTO orders (date, time) VALUES (?, ?)", [
    date,
    time,
  ]);
  const orderId = result.lastID;

  const mergedCart = cart.reduce((acc, item) => {
    const id = item.pizza.id;
    const size = item.size.toLowerCase();
    if (!id || !size) {
      throw new Error("Invalid item data");
    }
    const pizzaId = `${id}_${size}`;

    if (!acc[pizzaId]) {
      acc[pizzaId] = { pizzaId, quantity: 1 };
    } else {
      acc[pizzaId].quantity += 1;
    }

    return acc;
  }, {});

  for (const item of Object.values(mergedCart)) {
    const { pizzaId, quantity } = item;
    await db.run(
      "INSERT INTO order_details (order_id, pizza_id, quantity) VALUES (?, ?, ?)",
      [orderId, pizzaId, quantity],
    );
  }

  await db.run("COMMIT");

  return orderId;
}

/**
 * Rollback a failed transaction.
 */
export async function rollbackTransaction() {
  await db.run("ROLLBACK");
}

/**
 * Fetch paginated past orders.
 */
export async function getPastOrders(page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  return db.all(
    "SELECT order_id, date, time FROM orders ORDER BY order_id DESC LIMIT 10 OFFSET ?",
    [offset],
  );
}
