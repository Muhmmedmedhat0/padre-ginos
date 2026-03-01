import { useState } from "react";
import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { PizzaOfTheDay } from "../components/shared/pizza-of-the-day";
import { Header } from "../components/shared/header";
import { CartContext } from "../context/cart";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
  component: () => {
    const cartHook = useState([]);
    return (
      <>
        <CartContext.Provider value={cartHook}>
          <div>
            <Header />
            <Outlet />
            <PizzaOfTheDay />
          </div>
        </CartContext.Provider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
  notFoundComponent: () => (
    <div style={{ padding: "1rem" }}>
      <h2>Page not found</h2>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </div>
  ),
});
