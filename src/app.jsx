import { Pizza } from "./components/pizza/index";

export default function App() {
  return (
    <>
      <Pizza
        name="Margherita"
        description="Tomato sauce, mozzarella, and basil"
        image="/public/pizzas/mediterraneo.webp"
      />
      <Pizza
        name="Pepperoni"
        description="Tomato sauce, mozzarella, and pepperoni"
        image="/public/pizzas/pepperoni.webp"
      />
    </>
  );
}
