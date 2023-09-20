import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import React from 'react';
import {SafeAreaView, ScrollView, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Badge_BME280 from './app/shared/components/badge-bme280';
import Badge_SDS011 from './app/shared/components/badge-sds011';

const client = new ApolloClient({
  uri: 'http://192.168.50.184:4000/',
  cache: new InMemoryCache(),
});

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <ApolloProvider client={client}>
          <Badge_BME280 />
          <Badge_SDS011 />
        </ApolloProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
