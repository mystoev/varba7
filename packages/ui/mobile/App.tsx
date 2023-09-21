import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './app/shared/components/home';

const client = new ApolloClient({
  uri: 'http://10.0.2.2:4000/',
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

const HomePage = () => {
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
          <Home />
        </ApolloProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

const TestPage = ({navigation}) => {
  return (
    <ScrollView>
      <Text>Next page</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{title: 'Varba7'}}
        />
        <Stack.Screen
          name="Test"
          component={TestPage}
          options={{title: 'History'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
