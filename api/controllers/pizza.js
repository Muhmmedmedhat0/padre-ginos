import {
  getAllPizzaTypes,
  getAllPizzaSizes,
  getSizesByPizzaTypeId,
} from "../models/pizzaModel.js";

/**
 * Format a raw pizza row + sizes into the API response shape.
 */
function formatPizza(pizza, sizes) {
  return {
    id: pizza.pizza_type_id,
    name: pizza.name,
    category: pizza.category,
    description: pizza.description,
    image: `/public/pizzas/${pizza.pizza_type_id}.webp`,
    sizes,
  };
}

/**
 * GET /api/pizzas — list every pizza with sizes and prices.
 */
export async function getPizzas(req, res) {
  const [pizzas, pizzaSizes] = await Promise.all([
    getAllPizzaTypes(),
    getAllPizzaSizes(),
  ]);

  const responsePizzas = pizzas.map((pizza) => {
    const sizes = pizzaSizes.reduce((acc, current) => {
      if (current.id === pizza.pizza_type_id) {
        acc[current.size] = +current.price;
      }
      return acc;
    }, {});
    return formatPizza(pizza, sizes);
  });

  res.send(responsePizzas);
}

/**
 * GET /api/pizza-of-the-day — deterministic daily pick.
 */
export async function getPizzaOfTheDay(req, res) {
  const pizzas = await getAllPizzaTypes();

  const daysSinceEpoch = Math.floor(Date.now() / 86400000);
  const pizzaIndex = daysSinceEpoch % pizzas.length;
  const pizza = pizzas[pizzaIndex];

  const sizes = await getSizesByPizzaTypeId(pizza.pizza_type_id);

  const sizeObj = sizes.reduce((acc, current) => {
    acc[current.size] = +current.price;
    return acc;
  }, {});

  res.send(formatPizza(pizza, sizeObj));
}
