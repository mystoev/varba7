import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Stats from "./components/stats";
import WeatherBadge from "./components/weather-badge";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={WeatherBadge} />
        <Route path="/weather-stats" Component={Stats} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
