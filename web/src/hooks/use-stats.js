import axios from "axios";
import dayjs from "dayjs";
import { groupBy, maxBy, minBy, orderBy } from "lodash";
import { useEffect, useState } from "react";

const { VITE_API_ADDRESS, VITE_PORT } = import.meta.env;

const fetchData = async (filter) => {
  const url = `http://${VITE_API_ADDRESS}:${VITE_PORT}/stats?month=${filter}`;
  const { data } = await axios.get(url);

  return data;
};

const useStats = (monthFilter) => {
  const [stats, setStats] = useState({ max: [], min: [] });

  useEffect(() => {
    (async () => {
      const data = await fetchData(monthFilter);
      const result = groupBy(data, (d) => dayjs.unix(d.timestamp).get("date"));

      const maxTemperatures = Object.keys(result).map((key) =>
        maxBy(result[key], "temperature")
      );
      const minTemperatures = Object.keys(result).map((key) =>
        minBy(result[key], "temperature")
      );

      setStats({
        max: orderBy(maxTemperatures, [["timestamp"], ["asc"]]),
        min: orderBy(minTemperatures, [["timestamp"], ["asc"]]),
      });
    })();

    return () => {};
  }, [monthFilter]);

  return stats;
};

export { useStats };
