import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import MonthlyChart from "./monthly-chart";

import { useStats } from "../hooks/use-stats";
import { calculateTemperatureColor } from "../selectors/colors";
import { todayFormatted } from "../selectors/months";
import MonthsSelect from "./months-select";
import "./stats.css";

const ChartsContainer = ({ max, min }) => {
  return (
    <div className="charts-container">
      <h2>Max & Min Temperatures</h2>
      <MonthlyChart
        data={max}
        field={"temperature"}
        fill={calculateTemperatureColor}
      />
      <MonthlyChart
        data={min}
        field={"temperature"}
        fill={calculateTemperatureColor}
      />
    </div>
  );
};

ChartsContainer.propTypes = {
  max: PropTypes.array,
  min: PropTypes.array,
};

const Stats = () => {
  const [monthFilter, setMonthFilter] = useState(todayFormatted);
  const { max, min } = useStats(monthFilter);

  return (
    <div className="weather-stats">
      <h1>
        <Link to={"/"}>Home</Link>
      </h1>
      <MonthsSelect
        className="weather-stats-select"
        onSelectChange={({ target: { value } }) => setMonthFilter(value)}
      />
      <ChartsContainer max={max} min={min} />
    </div>
  );
};

export default Stats;
