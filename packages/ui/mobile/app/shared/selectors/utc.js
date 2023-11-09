import { format } from "date-fns";

export const toUTC = (timestamp, pattern) => {
  return format(
    timestamp - new Date().getTimezoneOffset() * 60 * 1000,
    pattern
  );
};
