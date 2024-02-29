import { useQuery } from "@apollo/client";

import { useSharedNavigation } from "../navigation";
import { GET_LATEST_BME280 } from "../queries/latest-bme280";
import { selectTemperatureColor } from "../selectors/color";
import { toUTC } from "../selectors/utc";
import { Heading1, Heading2, Heading3, Loading, WhiteLabel } from "./styled";

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
          <Loading>Loading...</Loading>
        ) : (
          <>
            <Heading2>
              Temperature:
              <WhiteLabel>{data.latestBME280.temperature} °C</WhiteLabel>
            </Heading2>
            <Heading2>
              Humidity: <WhiteLabel>{data.latestBME280.humidity} %</WhiteLabel>
            </Heading2>
            <Heading3>
              At:
              <WhiteLabel>
                {toUTC(data.latestBME280.timestamp, "HH:mm, dd MMM yyyy")}
              </WhiteLabel>
            </Heading3>
          </>
        )}
      </div>
    </div>
  );
};

export default Badge_BME280;
