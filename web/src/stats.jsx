import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { fetchData } from "./use-data";

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setStats(data);
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  return (
    <>
      {stats.map((entry) => {
        const date = dayjs.unix(entry.timestamp);
        const dateFormatted = `${date.date()} ${date.month()} ${date.year()}, ${date.hour()}:00`;
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
