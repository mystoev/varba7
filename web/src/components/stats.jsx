import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import MonthlyChart from "./monthly-chart";

import { useStats } from "../hooks/use-stats";
import {
  calculateHumidityColor,
  calculateTemperatureColor,
} from "../selectors/colors";
import { todayFormatted } from "../selectors/months";
import MonthsSelect from "./months-select";
import "./stats.css";

const ChartsContainer = ({ max, min }) => {
  return (
    <div className="charts-container">
      <h2>Max temperatures</h2>
      <MonthlyChart
        data={max}
        field={"temperature"}
        fill={calculateTemperatureColor}
      />
      <MonthlyChart
        data={max}
        field={"humidity"}
        fill={calculateHumidityColor}
      />
      <h2>Min temperatures</h2>
      <MonthlyChart
        data={min}
        field={"temperature"}
        fill={calculateTemperatureColor}
      />
      <MonthlyChart
        data={min}
        field={"humidity"}
        fill={calculateHumidityColor}
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
    <div>
      <h1>
        <Link to={"/"}>Home</Link>
      </h1>
      <h1>Varba7 Weather Statistics</h1>
      <MonthsSelect
        onSelectChange={({ target: { value } }) => setMonthFilter(value)}
      />
      <ChartsContainer max={max} min={min} />
    </div>
  );
};

export default Stats;
