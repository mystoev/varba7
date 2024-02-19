import { useQuery } from "@apollo/client";

import { GET_LATEST_SDS011 } from "../queries/latest-sds011";
import { selectAirQualityColor } from "../selectors/color";
import { toUTC } from "../selectors/utc";

const Badge_SDS011 = () => {
  const { loading, error, data } = useQuery(GET_LATEST_SDS011);

  if (error) return <Text>Error : {error.message}</Text>;

  const backgroundColor = selectAirQualityColor(
    data?.latestSDS011?.pm25,
    data?.latestSDS011?.pm10
  );

  return (
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
        Air Quality
      </p>
      {loading ? (
        <p
          style={{
            textAlign: "center",
            padding: 10,
          }}
        ></p>
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
            PM2.5:{" "}
            <span style={{ color: "white" }}>
              {data.latestSDS011.pm25} µg/m³
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
            PM10:{" "}
            <span style={{ color: "white" }}>
              {data.latestSDS011.pm10} µg/m³
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
            At:{" "}
            <span style={{ color: "white" }}>
              {toUTC(data.latestSDS011.timestamp, "HH:mm, dd MMM yyyy")}
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default Badge_SDS011;
