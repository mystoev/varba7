import axios from "axios";
import { useEffect, useState } from "react";

const { VITE_API_ADDRESS, VITE_PORT } = import.meta.env;

const fetchData = async () => {
  const url = `http://${VITE_API_ADDRESS}:${VITE_PORT}/latest`;
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
