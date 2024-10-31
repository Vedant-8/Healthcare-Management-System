import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Make sure to import your styles

const root = ReactDOM.createRoot(document.getElementById("app")); // Ensure your HTML has an element with id "app"
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
