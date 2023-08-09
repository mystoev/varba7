import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stats from "./stats";
import WeatherBadge from "./weather-badge";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={WeatherBadge} />
      <Route path="/weather-stats" Component={Stats} />
    </Routes>
  </BrowserRouter>
);

export default App;
