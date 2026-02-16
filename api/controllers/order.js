import {
  getAllOrders,
  getOrderById,
  getOrderItemsByOrderId,
  createOrder,
  rollbackTransaction,
  getPastOrders as fetchPastOrders,
} from "../models/orderModel.js";

/**
 * Format raw order-item rows into the API response shape.
 */
function formatOrderItems(items) {
  return items.map((item) =>
    Object.assign({}, item, {
      image: `/public/pizzas/${item.pizzaTypeId}.webp`,
      quantity: +item.quantity,
      price: +item.price,
    }),
  );
}

/**
 * GET /api/orders — list all orders.
 */
export async function getOrders(req, res) {
  const orders = await getAllOrders();
  res.send(orders);
}

/**
 * GET /api/order?id= — single order with items.
 */
export async function getOrder(req, res) {
  const id = req.query.id;

  const [order, orderItemsRes] = await Promise.all([
    getOrderById(id),
    getOrderItemsByOrderId(id),
  ]);

  const orderItems = formatOrderItems(orderItemsRes);
  const total = orderItems.reduce((acc, item) => acc + item.total, 0);

  res.send({
    order: Object.assign({ total }, order),
    orderItems,
  });
}

/**
 * POST /api/order — create a new order from a cart.
 */
export async function postOrder(req, res) {
  const { cart } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    res.status(400).send({ error: "Invalid order data" });
    return;
  }

  try {
    const orderId = await createOrder(cart);
    res.send({ orderId });
  } catch (error) {
    req.log.error(error);
    await rollbackTransaction();
    res.status(500).send({ error: "Failed to create order" });
  }
}

/**
 * GET /api/past-orders?page= — paginated past orders.
 */
export async function getPastOrders(req, res) {
  // Original had a 5-second artificial delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const page = parseInt(req.query.page, 10) || 1;
    const pastOrders = await fetchPastOrders(page);
    res.send(pastOrders);
  } catch (error) {
    req.log.error(error);
    res.status(500).send({ error: "Failed to fetch past orders" });
  }
}

/**
 * GET /api/past-order/:order_id — single past order details.
 */
export async function getPastOrder(req, res) {
  const orderId = req.params.order_id;

  try {
    const order = await getOrderById(orderId);

    if (!order) {
      res.status(404).send({ error: "Order not found" });
      return;
    }

    const orderItemsRes = await getOrderItemsByOrderId(orderId);
    const orderItems = formatOrderItems(orderItemsRes);
    const total = orderItems.reduce((acc, item) => acc + item.total, 0);

    res.send({
      order: Object.assign({ total }, order),
      orderItems,
    });
  } catch (error) {
    req.log.error(error);
    res.status(500).send({ error: "Failed to fetch order" });
  }
}
