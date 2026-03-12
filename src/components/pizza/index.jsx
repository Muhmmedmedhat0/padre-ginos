// eslint-disable-next-line no-unused-vars
import React from "react";

export function Pizza(props) {
  return (
    <div className="pizza">
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <img
        src={props.image ? props.image : "https://picsum.photos/200/200"}
        alt={props.name}
      />
    </div>
  );
}
