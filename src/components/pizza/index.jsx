import { useState } from "react";

export function Pizza(props) {
  const [counter, setCounter] = useState(0);

  return (
    <div
      className="pizza"
      onClick={() => {
        setCounter(counter + 1);
      }}
    >
      <h1>
        {props.name} {counter}
      </h1>
      <p>{props.description}</p>
      <img src={props.image} alt={props.name} />
    </div>
  );
}
