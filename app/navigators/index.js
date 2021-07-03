import React from 'react';
import Home from '../screens/Home';
import ViewCollection from '../screens/ViewCollection';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

const screens = {
  Home: 'Home',
  ViewCollection: 'ViewCollection',
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={false}
        initialRouteName={screens.Home}
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name={screens.Home} component={Home} />
        <Stack.Screen
          name={screens.ViewCollection}
          component={ViewCollection}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
