import axios from "axios";
import { useEffect, useState } from "react";

const fetchData = async (filter) => {
  const url = `http://localhost:8080/stats?month=${filter}`;
  const { data } = await axios.get(url);

  return data;
};

const useStats = (monthFilter) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchData(monthFilter);
      setStats(data);
    })();

    return () => {};
  }, [monthFilter]);

  return stats;
};

export { useStats };
