import Badge_BME280 from "./badge-bme280";
import Badge_Expenses from "./badge-expenses";
import Badge_SDS011 from "./badge-sds011";

const Home = () => {
  return (
    <div
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <Badge_BME280 />
      <Badge_SDS011 />
      <Badge_Expenses />
    </div>
  );
};

export default Home;
