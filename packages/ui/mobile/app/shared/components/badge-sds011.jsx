import {useQuery} from '@apollo/client';
import {format} from 'date-fns';
import {Text, View} from 'react-native';

import {GET_LATEST_SDS011} from '../queries/latest-sds011';
import {selectAirQualityColor} from '../selectors/color';
import {badgeStyles, headingStyles} from '../styles/text';

const Badge_SDS011 = () => {
  const {loading, error, data} = useQuery(GET_LATEST_SDS011);

  if (error) return <Text>Error : {error.message}</Text>;

  const backgroundColor = selectAirQualityColor(
    data?.latestSDS011?.pm25,
    data?.latestSDS011?.pm10,
  );

  return (
    <View style={[badgeStyles.container, {backgroundColor}]}>
      <Text style={headingStyles.h1}>Air Quality</Text>
      {loading ? (
        <Text style={headingStyles.loading}>Loading...</Text>
      ) : (
        <>
          <Text style={headingStyles.h2}>
            PM2.5:{' '}
            <Text style={headingStyles.white}>{data.latestSDS011.pm25}</Text>
          </Text>
          <Text style={headingStyles.h2}>
            PM10:{' '}
            <Text style={headingStyles.white}>{data.latestSDS011.pm10}</Text>
          </Text>
          <Text style={headingStyles.h4}>
            At:{' '}
            <Text style={headingStyles.white}>
              {format(data.latestSDS011.timestamp, 'HH:mm, dd MMM yyyy')}
            </Text>
          </Text>
        </>
      )}
    </View>
  );
};

export default Badge_SDS011;
