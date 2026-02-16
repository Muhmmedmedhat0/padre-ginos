// import React from "react";
import ReactDOM from "react-dom/client";
import { Pizza } from "./pizaa";

const app = () => {
  return (
    <>
      <h1>Welcome to Padre Gino&apos;s Pizzeria</h1>
      <Pizza
        name="Margherita"
        description="Tomato sauce, mozzarella, and basil"
      />
      <Pizza
        name="Pepperoni"
        description="Tomato sauce, mozzarella, and pepperoni"
      />
    </>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(app());
