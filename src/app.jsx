import { Pizza } from "./components/pizza";

export default function App() {
  return (
    <>
      <h1>Welcome to Padre Gino&apos;s Pizzeria</h1>
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
