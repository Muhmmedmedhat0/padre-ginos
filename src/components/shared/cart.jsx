import { currencyFormatter } from "../../utils/currency";

export function Cart({ cart, checkout }) {
  const total = cart.reduce(
    (sum, item) => sum + item.pizza.sizes[item.size],
    0,
  );

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> -
            <span className="type">{item.pizza.name}</span> -
            <span className="price">
              {currencyFormatter.format(item.pizza.sizes[item.size])}
            </span>
          </li>
        ))}
      </ul>
      <p>Total: {currencyFormatter.format(total)}</p>
      <button role="button" onClick={checkout} disabled={cart.length === 0}>
        Checkout
      </button>
    </div>
  );
}
