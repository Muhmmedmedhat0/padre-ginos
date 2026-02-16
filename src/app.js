import React from "react";
import ReactDOM from "react-dom/client";
const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};

const app = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Welcome to Padre Gino's Pizzeria"),
    React.createElement(Pizza, {
      name: "The Pepperoni Pizza",
      description:
        "The classic pizza with pepperoni, tomato sauce, and mozzarella cheese.",
    }),
    React.createElement(Pizza, {
      name: "The Hawaiian Pizza",

      description:
        "The controversial pizza with ham, pineapple, tomato sauce, and mozzarella cheese.",
    }),
    React.createElement(Pizza, {
      name: "The Margherita Pizza",
      description:
        "The traditional pizza with tomato sauce, fresh mozzarella, and basil.",
    }),
    React.createElement(Pizza, {
      name: "The Vegetarian Pizza",
      description:
        "The healthy pizza with mushrooms, bell peppers, onions, and olives.",
    }),
    React.createElement(Pizza, {
      name: "The Meat Lovers Pizza",
      description: "The hearty pizza with pepperoni, sausage, bacon, and ham.",
    }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(app());
