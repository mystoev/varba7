/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
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
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <ApolloProvider client={client}>
          <Badge />
        </ApolloProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
