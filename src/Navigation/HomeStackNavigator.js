import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../Screen/SplashScreen';
import AuthScreen from '../Screen/Auth/AuthScreen';
import LoginScreen from '../Screen/Auth/LoginScreen';
import SignUpScreen from '../Screen/Auth/SignUpScreen';
import HomeScreen from '../Screen/Dashboard/HomeScreen';
import DrawerNavigatior from './DrawerNavigatior';
import BottomNavigator from './BottomNavigator';
import FaqScreen from '../Screen/FAQ/FaqScreen';
import ReportScreen from '../Screen/Report/ReportScreen';
import EditProfileScreen from '../Screen/EditProfile/EditProfileScreen';
import FavouriteScreen from '../Screen/Favourite/FavouriteScreen';

const Stack = createStackNavigator();
const HomeStackNavigator = () => (

  <Stack.Navigator initialRouteName={"HomeScreen"} screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="FaqScreen" component={FaqScreen} />
    <Stack.Screen name="ReportScreen" component={ReportScreen} />
    <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
    <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
  </Stack.Navigator>
)



export default HomeStackNavigator;