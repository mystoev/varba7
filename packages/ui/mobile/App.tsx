import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import React from 'react';
import {SafeAreaView, ScrollView, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Badge from './app/shared/components/badge';

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
          <Badge />
        </ApolloProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
