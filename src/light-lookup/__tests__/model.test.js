import React from "react";
import {
  fireEvent,
  getByText,
  getByTestId,
  render,
  prettyDOM,
  cleanup
} from "react-testing-library";
import { getSimplePaths } from "@xstate/graph";

import { Light } from "../light-component";
import { lightMachine } from "../light-machine";

afterEach(cleanup);

describe("Iterate through all paths in component", () => {
  test(`Light component`, () => {
    const interactions = {
      green: {
        confirmState: container => expectComponentToShow(container, "green"),
        SWITCH: container => clickButtonWithText(container, "Switch"),
        STOP: container => clickButtonWithText(container, "STOP!")
      },
      amber: {
        confirmState: container => expectComponentToShow(container, "amber"),
        SWITCH: container => clickButtonWithText(container, "Switch"),
        STOP: container => clickButtonWithText(container, "STOP!")
      },
      red: {
        confirmState: container => expectComponentToShow(container, "red"),
        SWITCH: container => clickButtonWithText(container, "Switch"),
        STOP: container => clickButtonWithText(container, "STOP!")
      }
    };

    testModel(lightMachine, <Light />, interactions);
  });
});

function clickButtonWithText(container, buttonText, expectedValue) {
  fireEvent.click(getByText(container, buttonText));
}

function expectComponentToShow(container, expected) {
  expect(getByTestId(container, "state-value").textContent).toBe(expected);
}

function logStateValue(container) {
  console.log(getByTestId(container, "state-value").textContent);
}

function logEventType(eventType) {
  console.log(`  |
  V`);
  console.log(eventType);
  console.log(`  |
  V`);
}

function testModel(model, component, interactions) {
  const p = Object.values(getSimplePaths(model));
  const pathList = p.map(m => m.paths).flat();

  console.log("Total number of paths", pathList.length);

  pathList.forEach(steps => {
    console.log("START vvvvvvvvvv");
    const { container } = render(<Light />);
    logStateValue(container);
    steps.forEach(step => {
      const func = interactions[step.state.value][step.event.type];
      func(container, step.state.value);
      logEventType(step.event.type);
      logStateValue(container);
      const nextState = model.transition(step.state.value, step.event.type);
      interactions[nextState.value].confirmState(container, nextState.value);
    });
    console.log("STOP  ^^^^^^^^^");
    cleanup();
  });
}
