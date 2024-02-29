import { useQuery } from "@apollo/client";

import { GET_LATEST_SDS011 } from "../queries/latest-sds011";
import { selectAirQualityColor } from "../selectors/color";
import { toUTC } from "../selectors/utc";
import {
  Container,
  Heading1,
  Heading2,
  Heading3,
  Loading,
  WhiteLabel,
} from "./styled";

const Badge_SDS011 = () => {
  const { loading, error, data } = useQuery(GET_LATEST_SDS011);

  if (error) return <p>Error : {error.message}</p>;

  const backgroundColor = selectAirQualityColor(
    data?.latestSDS011?.pm25,
    data?.latestSDS011?.pm10
  );

  return (
    <Container backgroundColor={backgroundColor}>
      <Heading1>Air Quality</Heading1>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Heading2>
            PM2.5: <WhiteLabel>{data.latestSDS011.pm25} µg/m³</WhiteLabel>
          </Heading2>
          <Heading2>
            PM10: <WhiteLabel>{data.latestSDS011.pm10} µg/m³</WhiteLabel>
          </Heading2>
          <Heading3>
            At:{" "}
            <WhiteLabel>
              {toUTC(data.latestSDS011.timestamp, "HH:mm, dd MMM yyyy")}
            </WhiteLabel>
          </Heading3>
        </>
      )}
    </Container>
  );
};

export default Badge_SDS011;
