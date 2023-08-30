import React from "react";
import ReactDOM from "react-dom/client";
import { Route, HashRouter as Router, Routes } from "react-router-dom";

import Stats from "./components/stats";
import WeatherBadge from "./components/weather-badge";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" Component={WeatherBadge} />
        <Route path="/weather-stats" Component={Stats} />
      </Routes>
    </Router>
  </React.StrictMode>
);
