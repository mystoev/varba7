import axios from "axios";
import { useEffect, useState } from "react";

const fetchData = async () => {
  const url = `http://176.12.23.79:5173/latest`;
  const { data } = await axios.get(url);

  return data;
};

const useLatest = () => {
  const [latest, setLatest] = useState({});

  useEffect(() => {
    (async () => {
      const [data] = await fetchData();

      setLatest(data);
    })();

    return () => {};
  }, []);

  return latest;
};

export { useLatest };
