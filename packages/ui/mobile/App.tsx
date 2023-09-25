import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {sha256} from 'react-native-sha256';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getUniqueId} from 'react-native-device-info';

import {BME280Page, HomePage} from './app/shared/pages';

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV !== 'production'
      ? 'http://176.12.23.79:6161'
      : process.env.REACT_APP_GQL_SERVER,
});

const authLink = setContext(async (_, {headers}) => {
  const uniqueId = await getUniqueId();
  const mobileToken = await sha256(uniqueId);

  return {
    headers: {
      ...headers,
      authorization: mobileToken ? `Bearer ${mobileToken}` : '',
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
