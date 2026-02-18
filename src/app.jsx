import { Order } from "./components/order/index";
import { PizzaOfTheDay } from "./components/shared/pizza-of-the-day";

export default function App() {
  return (
    <>
      <h1 className="logo">Padre Ginos Pizza - Order now</h1>
      <Order />
      <PizzaOfTheDay />
    </>
  );
}
