import { Link } from "react-router-dom";

import { useLatest } from "../hooks/use-latest";
import { calculateTemperatureColor } from "../selectors/colors";
import "./weather-badge.css";

const WeatherBadge = () => {
  const { temperature, humidity } = useLatest();
  const temperatureColor = calculateTemperatureColor({ temperature });

  return (
    temperature && (
      <Link
        to={"weather-stats"}
        className="latest"
        style={{ backgroundColor: temperatureColor }}
      >
        <h1>Varba7</h1>
        <section>
          <h2>
            <p>Temperature:</p>
            <p>{temperature}°C</p>
          </h2>
          <h2>
            <p>Humidity:</p>
            <p>{humidity}%</p>
          </h2>
        </section>
      </Link>
    )
  );
};

export default WeatherBadge;
