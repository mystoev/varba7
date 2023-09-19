import {gql, useQuery} from '@apollo/client';
import {Text, View} from 'react-native';

const GET_LOCATIONS = gql`
  query Query {
    latestBME280 {
      humidity
      temperature
      timestamp
    }
  }
`;

const Badge = () => {
  const {loading, error, data} = useQuery(GET_LOCATIONS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <View>
      <Text>Temperatures: {data.latestBME280.temperature}</Text>
      <Text>Humidity: {data.latestBME280.humidity}</Text>
      <Text>At: {data.latestBME280.timestamp}</Text>
    </View>
  );
};

export default Badge;
