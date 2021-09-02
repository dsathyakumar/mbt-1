import React from "react";
import { useMachine } from "@xstate/react";

import { lightMachine } from "./light-machine";

const buttonLook = {
  green: {
    padding: "1rem",
    backgroundColor: "green",
    color: "white"
  },
  amber: {
    padding: "1rem",
    backgroundColor: "orange"
  },
  red: {
    padding: "1rem",
    backgroundColor: "red"
  }
};

export function Light() {
  const [current, send] = useMachine(lightMachine);

  return (
    <div
      style={{
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        width: "120px",
        margin: "0 auto"
      }}
    >
      <h2 data-testid="state-value" style={buttonLook[current.value]}>
        {current.value}
      </h2>
      <button onClick={() => send("SWITCH")}>Switch</button>
      <button onClick={() => send("STOP")}>STOP!</button>
    </div>
  );
}
