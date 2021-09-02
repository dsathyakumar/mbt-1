import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Light } from "./light-lookup/light-component";

function App() {
  return (
    <div className="App">
      <h1>Simple model based testing example</h1>
      <h2>
        Light component toggles through states or jumps to red when stopped
      </h2>
      <img src="https://res.cloudinary.com/lazydayed/image/upload/v1554714019/Devtings/light-machine.png" />
      <Light />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
