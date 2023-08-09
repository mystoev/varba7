import { Link } from "react-router-dom";
import { useLatest } from "./use-latest";
import "./weather-badge.css";

const WeatherBadge = () => {
  const { temperature, humidity } = useLatest();

  return (
    <Link to={"weather-stats"}>
      <div className="latest">
        <h1>Varba7</h1>
        <h2>
          <span>Temperature:</span> {temperature}°C
        </h2>
        <h2>
          <span>Humidity</span> {humidity}%
        </h2>
      </div>
    </Link>
  );
};

export default WeatherBadge;
