import { MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { calculateMonths, todayFormatted } from "../selectors/months";

const months = calculateMonths();

const MonthsSelect = ({ onSelectChange, ...props }) => (
  <Select onChange={onSelectChange} defaultValue={todayFormatted} {...props}>
    {months.map((month) => (
      <MenuItem key={month} value={dayjs(month).format("YYYYMMDD")}>
        {dayjs(month).format("MMMM YYYY")}
      </MenuItem>
    ))}
  </Select>
);

MonthsSelect.propTypes = {
  onSelectChange: PropTypes.func.isRequired,
};

export default MonthsSelect;
