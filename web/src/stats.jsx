import dayjs from "dayjs";

import { useStats } from "./use-stats";

const Stats = () => {
  const stats = useStats();

  return (
    <>
      {stats.map((entry) => {
        const date = dayjs.unix(entry.timestamp);
        const dateFormatted = `${date.date()} ${date.month()} ${date.year()}, ${date.hour()}:${date.minute()}`;
        return (
          <div key={entry._id}>
            <p>Time: {dateFormatted}</p>
            <p>Temperature: {entry.temperature} °C</p>
            <p>Humidity: {entry.humidity} %</p>
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default Stats;
