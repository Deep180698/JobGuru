

// App.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import AuthStackNavigator from './AuthStackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigatior =()=> {
  return (
      <Drawer.Navigator
        initialRouteName="AuthStackNavigator"
        drawerContent={() => <CustomDrawerContent />}
      >
        <Drawer.Screen name="AuthStackNavigator" options={{headerShown:false}} component={AuthStackNavigator} />
      </Drawer.Navigator>
  );
}

export default DrawerNavigatior;
