import { useQuery } from "@apollo/client";

import { useSharedNavigation } from "../../navigation";
import { GET_LATEST_BME280 } from "../queries/latest-bme280";
import { selectTemperatureColor } from "../selectors/color";
import { toUTC } from "../selectors/utc";

const Badge_BME280 = () => {
  const { loading, error, data } = useQuery(GET_LATEST_BME280);
  const { navigate } = useSharedNavigation();

  if (error) return <p>Error : {error.message}</p>;

  const backgroundColor = selectTemperatureColor(
    data?.latestBME280?.temperature
  );

  return (
    <div
      onClick={() => {
        navigate("bme280");
      }}
    >
      <div
        style={{
          marginTop: 20,
          backgroundColor,
          width: "90%",
          alignSelf: "center",
          margin: "auto",
          borderRadius: 5,
        }}
      >
        <p
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
            paddingTop: 10,
          }}
        >
          Weather
        </p>
        {loading ? (
          <p
            style={{
              textAlign: "center",
              padding: 10,
            }}
          >
            Loading...
          </p>
        ) : (
          <>
            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
                padding: 5,
                fontSize: 24,
                color: "#d3d3d3",
              }}
            >
              Temperature:
              <span>{data.latestBME280.temperature} °C</span>
            </p>
            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
                padding: 5,
                fontSize: 24,
                color: "#d3d3d3",
              }}
            >
              Humidity:{" "}
              <span style={{ color: "white" }}>
                {data.latestBME280.humidity} %
              </span>
            </p>
            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#d3d3d3",
                padding: 5,
              }}
            >
              At:
              <span style={{ color: "white" }}>
                {toUTC(data.latestBME280.timestamp, "HH:mm, dd MMM yyyy")}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Badge_BME280;
