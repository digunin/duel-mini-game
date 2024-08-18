import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
import Provider from "./store/contextProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider>
    <App />
  </Provider>
);
