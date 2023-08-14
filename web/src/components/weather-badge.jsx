import { Link } from "react-router-dom";

import { useLatest } from "../hooks/use-latest";
import { calculateTemperatureColor } from "../selectors/colors";
import "./weather-badge.css";

const WeatherBadge = () => {
  const { temperature, humidity } = useLatest();
  const temperatureColor = calculateTemperatureColor({ temperature });

  return (
    temperature && (
      <Link to={"weather-stats"}>
        <div className="latest" style={{ backgroundColor: temperatureColor }}>
          <h1>Varba7</h1>
          <h2>
            <span>Temperature:</span> {temperature}°C
          </h2>
          <h2>
            <span>Humidity</span> {humidity}%
          </h2>
        </div>
      </Link>
    )
  );
};

export default WeatherBadge;
