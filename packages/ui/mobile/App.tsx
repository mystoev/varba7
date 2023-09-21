import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MMKVLoader} from 'react-native-mmkv-storage';

import {BME280Page, HomePage} from './app/shared/pages';

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV !== 'production'
      ? 'http://10.0.2.2:4000'
      : process.env.REACT_APP_GQL_SERVER,
});

const storage = new MMKVLoader().initialize();
const authLink = setContext(async (_, {headers}) => {
  const token = await storage.getStringAsync('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

const App = () => (
  <ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{title: 'Varba7'}}
        />
        <Stack.Screen
          name="bme280"
          component={BME280Page}
          options={{title: 'BME280 History'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </ApolloProvider>
);

export default App;
