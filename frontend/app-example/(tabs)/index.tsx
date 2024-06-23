import React from 'react';
import { AppRegistry } from 'react-native';

// Importing necessary navigation components from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Define your screens
import HomeScreen from './homescreen';
//import OtherScreen from './screens/OtherScreen';

// Create a Stack navigator
const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const AppContainer: React.FC = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent('frontend', () => AppContainer);