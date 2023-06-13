import axios from "axios";

const fetchData = async () => {
  const url = "http://localhost:8080/stats";
  const { data } = await axios.get(url);

  return data;
};

export { fetchData };
