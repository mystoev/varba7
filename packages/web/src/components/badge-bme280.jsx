import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { useSharedNavigation } from "../navigation";
import { GET_LATEST_BME280 } from "../queries/latest-bme280";
import { selectTemperatureColor } from "../selectors/color";
import { toUTC } from "../selectors/utc";

const Heading1 = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: black;
  text-align: center;
  padding-top: 10px;
`;

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
          backgroundColor,
          width: "90%",
          alignSelf: "center",
          margin: "auto",
          borderRadius: 5,
        }}
      >
        <Heading1>Weather</Heading1>
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
              <span style={{ color: "white" }}>
                {data.latestBME280.temperature} °C
              </span>
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
