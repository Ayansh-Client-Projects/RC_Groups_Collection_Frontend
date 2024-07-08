import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./Utility/customHooks.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </BrowserRouter>
);
