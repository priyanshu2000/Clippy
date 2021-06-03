import React from 'react'
import Home from '../screens/home'
import { createStackNavigator } from '@react-navigation/stack';
import ViewCollection from '../screens/view-collection';

const Stack = createStackNavigator();

const Navigator =()=> {
  return (
    <Stack.Navigator headerMode={false} initialRouteName="home" >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="ViewCollection" component={ViewCollection} />
      {/* <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}

export default Navigator;
