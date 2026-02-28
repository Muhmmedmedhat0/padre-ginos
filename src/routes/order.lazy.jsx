import { createLazyFileRoute } from "@tanstack/react-router";

import { Order } from "../components/order/index";

export const Route = createLazyFileRoute("/order")({
  component: Order,
});
