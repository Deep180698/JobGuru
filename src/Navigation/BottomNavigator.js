// App.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import HomeScreen from '../Screen/Dashboard/HomeScreen';
import FavouriteScreen from '../Screen/Favourite/FavouriteScreen';
import EditProfileScreen from '../Screen/EditProfile/EditProfileScreen';
import color from '../Utils/Color';
import PostScreen from '../Screen/Post/PostScreen';



const Tab = createBottomTabNavigator();


const App = () => {
  return (
    <Tab.Navigator  sceneContainerStyle={{backgroundColor:color.black}} screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: 'home',
        }}
      />
      {/* <Tab.Screen
        name="PostScreen"
        component={PostScreen}
        options={{
          tabBarIcon: 'plussquare',
        }}
      /> */}
      
    </Tab.Navigator>
  );
};

export default App;
