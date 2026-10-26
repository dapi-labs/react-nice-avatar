import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "tailwindcss/tailwind.css";
import "./index.scss";

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
