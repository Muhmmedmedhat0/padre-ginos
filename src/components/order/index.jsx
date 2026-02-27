import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { Pizza } from "../pizza";
import { currencyFormatter } from "../../utils/currency";
import { Cart } from "../shared/cart";
import { CartContext } from "../../context/cart";

export function Order() {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useContext(CartContext);

  // Memoize the selected pizza — only recompute when pizzaType or pizzaTypes change
  const selectedPizza = useMemo(
    () => pizzaTypes.find((pizza) => pizzaType === pizza.id),
    [pizzaType, pizzaTypes],
  );

  // Memoize the formatted price — only recompute when selection or size changes
  const price = useMemo(() => {
    if (!selectedPizza?.sizes) return "";
    return currencyFormatter.format(selectedPizza.sizes[pizzaSize]);
  }, [selectedPizza, pizzaSize]);

  // Fetch pizza types ONCE on mount — not on every cart change
  useEffect(() => {
    let cancelled = false;
    async function fetchPizzaTypes() {
      const res = await fetch("/api/pizzas");
      const data = await res.json();
      if (!cancelled) {
        setPizzaTypes(data);
        setLoading(false);
      }
    }
    fetchPizzaTypes();
    return () => {
      cancelled = true;
    };
  }, []);

  // Stable reference so Cart doesn't re-render unnecessarily
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!selectedPizza) return;
      setCart((prev) => [...prev, { pizza: selectedPizza, size: pizzaSize }]);
    },
    [selectedPizza, pizzaSize],
  );

  // Stable reference — only depends on cart
  const checkout = useCallback(async () => {
    if (cart.length === 0) return;
    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });
    setCart([]);
  }, [cart]);

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                id="pizza-type"
                onChange={(e) => setPizzaType(e.target.value)}
                onBlur={(e) => setPizzaType(e.target.value)}
                name="pizza-type"
                value={pizzaType}
              >
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  pizzaTypes.map((pizza) => (
                    <option key={pizza.id} value={pizza.id}>
                      {pizza.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    id="pizza-size-s"
                    aria-label="Small"
                    checked={pizzaSize === "S"}
                    onChange={(e) => setPizzaSize(e.target.value)}
                    type="radio"
                    name="pizza-size"
                    value="S"
                  />
                  <label htmlFor="pizza-size-s">Small</label>
                </span>
                <span>
                  <input
                    id="pizza-size-m"
                    aria-label="Medium"
                    checked={pizzaSize === "M"}
                    onChange={(e) => setPizzaSize(e.target.value)}
                    type="radio"
                    name="pizza-size"
                    value="M"
                  />
                  <label htmlFor="pizza-size-m">Medium</label>
                </span>
                <span>
                  <input
                    id="pizza-size-l"
                    aria-label="Large"
                    checked={pizzaSize === "L"}
                    onChange={(e) => setPizzaSize(e.target.value)}
                    type="radio"
                    name="pizza-size"
                    value="L"
                  />
                  <label htmlFor="pizza-size-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          <div className="order-pizza">
            {loading || (
              <Pizza
                name={selectedPizza?.name}
                description={selectedPizza?.description}
                image={selectedPizza?.image}
              />
            )}
            <p>{price}</p>
          </div>
        </form>
      </div>
      {loading ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <Cart cart={cart} checkout={checkout} />
      )}
    </div>
  );
}
