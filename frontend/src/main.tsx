import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import "./styles/index.css";
import Item from "./pages/Item";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/action">
          <Route index element={<Item />} />
          <Route path=":idItem" element={<Item />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
