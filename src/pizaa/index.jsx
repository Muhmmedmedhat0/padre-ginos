// import React from "react";

export function Pizza(props) {
  return (
    <div key={props.name}>
      <h1>{props.name}</h1>
      <p>{props.description}</p>
    </div>
  );
}

// export { Pizza };
