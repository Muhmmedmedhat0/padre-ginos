import { useContext } from "react";
import { Link } from "@tanstack/react-router";

import { CartContext } from "../../context/cart";
export function Header() {
  const [cart] = useContext(CartContext);
  return (
    <nav>
      <Link href="/">
        <h1 className="logo">Padre Gino&#39;s Pizza</h1>
      </Link>
      <div className="nav-cart">
        <img
          src="https://twemoji.maxcdn.com/v/latest/svg/1f6d2.svg"
          alt="shopping cart"
          className="nav-cart-icon"
          style={{ width: "2rem", height: "2rem", verticalAlign: "middle" }}
        />
        <span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
}
