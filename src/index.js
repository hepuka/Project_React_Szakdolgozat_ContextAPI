import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import reducer, { initialState } from "./ContextAPI/reducer";
import { StateProvider } from "./ContextAPI/StateProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>
);
