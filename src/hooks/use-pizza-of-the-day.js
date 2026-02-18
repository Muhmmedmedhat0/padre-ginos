import { useState, useEffect, useDebugValue } from "react";

// hook is a function that starts with "use" and can call other hooks
// this hook will fetch the pizza of the day from the server and return it
// it is a function that return another function that can be used to fetch the pizza of the day

export function usePizzaOfTheDay() {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(void 0);
  // useDebugValue is a hook that allows us to display a value in the React DevTools
  useDebugValue(
    pizzaOfTheDay
      ? `${pizzaOfTheDay.id} - ${pizzaOfTheDay.name}`
      : "No pizza of the day",
  );

  async function fetchPizzaOfTheDay() {
    const response = await fetch("/api/pizza-of-the-day");
    const data = await response.json();
    setPizzaOfTheDay(data);
  }

  useEffect(() => {
    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
}
