import Badge_BME280 from "./badge-bme280";
import Badge_Expenses from "./badge-expenses";
import Badge_SDS011 from "./badge-sds011";

const Home = () => {
  return (
    <div>
      <Badge_BME280 />
      <Badge_SDS011 />
      <Badge_Expenses />
    </div>
  );
};

export default Home;
