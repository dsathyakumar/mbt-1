import { Machine } from "xstate";

export const lightMachine = Machine(
  {
    id: "light",
    initial: "green",
    // count blows up the graph
    // context: {
    //   count: 0
    // },
    states: {
      green: {
        onEntry: ["countTransitions"],
        on: {
          SWITCH: "amber"
        }
      },
      amber: {
        onEntry: ["countTransitions"],
        on: {
          SWITCH: "red"
        }
      },
      red: {
        onEntry: ["countTransitions"],
        on: {
          SWITCH: "green"
        }
      }
    },
    on: {
      STOP: "red"
    }
  },
  {
    actions: {
      countTransitions: () => {
        return;
      } // this blows up the graph paths !!!!! assign({ count: ctx => ctx.count + 1 })
    }
  }
);
