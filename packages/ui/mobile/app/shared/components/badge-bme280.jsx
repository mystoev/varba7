import {useQuery} from '@apollo/client';
import {format} from 'date-fns';
import {Pressable, Text, View} from 'react-native';

import {useSharedNavigation} from '../../navigation';
import {GET_LATEST_BME280} from '../queries/latest-bme280';
import {selectTemperatureColor} from '../selectors/color';
import {badgeStyles, headingStyles} from '../styles/text';

const Badge_BME280 = () => {
  const {loading, error, data} = useQuery(GET_LATEST_BME280);
  const {navigate} = useSharedNavigation();

  if (error) return <Text>Error : {error.message}</Text>;

  const backgroundColor = selectTemperatureColor(
    data?.latestBME280?.temperature,
  );

  return (
    <Pressable
      onPress={() => {
        navigate('bme280');
      }}>
      <View style={[badgeStyles.container, {backgroundColor}]}>
        <Text style={headingStyles.h1}>Weather</Text>
        {loading ? (
          <Text style={headingStyles.loading}>Loading...</Text>
        ) : (
          <>
            <Text style={headingStyles.h2}>
              Temperature:{' '}
              <Text style={headingStyles.white}>
                {data.latestBME280.temperature} °C
              </Text>
            </Text>
            <Text style={headingStyles.h2}>
              Humidity:{' '}
              <Text style={headingStyles.white}>
                {data.latestBME280.humidity} %
              </Text>
            </Text>
            <Text style={headingStyles.h4}>
              At:{' '}
              <Text style={headingStyles.white}>
                {format(data.latestBME280.timestamp, 'HH:mm, dd MMM yyyy')}
              </Text>
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
};

export default Badge_BME280;
