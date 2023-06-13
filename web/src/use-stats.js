import axios from "axios";
import { useEffect, useState } from "react";

const fetchData = async () => {
  const url = "http://localhost:8080/stats";
  const { data } = await axios.get(url);

  return data;
};

const useStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setStats(data);
    })();

    return () => {};
  }, []);

  return stats;
};

export { useStats };
