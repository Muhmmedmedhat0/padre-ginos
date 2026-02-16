import {
  getOrders,
  getOrder,
  postOrder,
  getPastOrders,
  getPastOrder,
} from "../controllers/order.js";

/**
 * Register order-related routes.
 */
export default async function orderRoutes(server) {
  server.get("/api/orders", getOrders);
  server.get("/api/order", getOrder);
  server.post("/api/order", postOrder);
  server.get("/api/past-orders", getPastOrders);
  server.get("/api/past-order/:order_id", getPastOrder);
}
