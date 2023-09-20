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
  uri: 'http://192.168.50.184:4000/',
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

const HomePage = ({navigation}) => {
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
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Test')}
          />
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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Test" component={TestPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
