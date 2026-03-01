import { createLazyFileRoute } from "@tanstack/react-router";
import { PastOrders } from "../components/past-orders/index";

export const Route = createLazyFileRoute("/past")({
  component: PastOrders,
});
