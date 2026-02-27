import { StrictMode, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { CartContext } from "./context/cart";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

function Root() {
  // hook used inside component body
  const cart = useState([]);
  return (
    <CartContext.Provider value={cart}>
      <App />
    </CartContext.Provider>
  );
}

root.render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
