import {View} from 'react-native';

import Badge_BME280 from './badge-bme280';
import Badge_Expenses from './badge-expenses';
import Badge_SDS011 from './badge-sds011';

const Home = () => {
  return (
    <View>
      <Badge_BME280 />
      <Badge_SDS011 />
      <Badge_Expenses />
    </View>
  );
};

export default Home;
