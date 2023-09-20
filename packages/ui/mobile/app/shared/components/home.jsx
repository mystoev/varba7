import {Text, View} from 'react-native';

import Badge_BME280 from './badge-bme280';
import Badge_SDS011 from './badge-sds011';

const Home = () => {
  return (
    <View>
      <Text>Varba7</Text>
      <Badge_BME280 />
      <Badge_SDS011 />
    </View>
  );
};

export default Home;
