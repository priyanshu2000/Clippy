import React from 'react'
import Home from '../screens/Home'
import ViewCollection from '../screens/ViewCollection';
import {  CollectionProvider } from '../utils/context'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Navigator =()=> {
  return (
    <CollectionProvider>
      <Stack.Navigator
          headerMode={false}
          initialRouteName="home"
          screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="view-collection" component={ViewCollection} />
      </Stack.Navigator>
    </CollectionProvider>
  );
}

export default Navigator;