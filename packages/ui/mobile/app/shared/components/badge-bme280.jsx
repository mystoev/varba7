import {gql, useQuery} from '@apollo/client';
import {format} from 'date-fns';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {useGoTo} from '../../navigation';

const GET_LATEST_BME280 = gql`
  query Query {
    latestBME280 {
      humidity
      temperature
      timestamp
    }
  }
`;

const badgeStyles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: 'red',
    width: '80%',
    alignSelf: 'center',
    margin: 'auto',
  },
  text: {
    textAlign: 'center',
    padding: 10,
    color: 'black',
  },
});

const Badge_BME280 = () => {
  const {loading, error, data} = useQuery(GET_LATEST_BME280);
  const {navigate} = useGoTo();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <Pressable
      onPress={() => {
        navigate('Test');
      }}>
      <View style={badgeStyles.container}>
        <Text style={badgeStyles.text}>
          Temperatures: {data.latestBME280.temperature}
        </Text>
        <Text style={badgeStyles.text}>
          Humidity: {data.latestBME280.humidity}
        </Text>
        <Text style={badgeStyles.text}>
          At: {format(data.latestBME280.timestamp, 'HH:mm, dd MMM yyyy')}
        </Text>
      </View>
    </Pressable>
  );
};

export default Badge_BME280;
