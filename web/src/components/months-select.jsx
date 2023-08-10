import { MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { calculateMonths, todayFormatted } from "../selectors/months";

const months = calculateMonths();

const MonthsSelect = ({ onSelectChange }) => (
  <Select onChange={onSelectChange} defaultValue={todayFormatted}>
    {months.reverse().map((month) => {
      return (
        <MenuItem key={month} value={dayjs(month).format("YYYYMMDD")}>
          {dayjs(month).format("MMMM YYYY")}
        </MenuItem>
      );
    })}
  </Select>
);

MonthsSelect.propTypes = {
  onSelectChange: PropTypes.func.isRequired,
};

export default MonthsSelect;
