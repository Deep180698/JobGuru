

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../Screen/Dashboard/HomeScreen';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
