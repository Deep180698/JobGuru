import React,{useEffect} from 'react'
import {Linking} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../Screen/SplashScreen';
import AuthScreen from '../Screen/Auth/AuthScreen';
import UserDetails from '../Screen/Auth/UserDetails';
import LoginScreen from '../Screen/Auth/LoginScreen';
import SignUpScreen from '../Screen/Auth/SignUpScreen';
import ResetPasswordScreen from '../Screen/Auth/ResetPasswordScreen';
import ForgotPasswordScreen from '../Screen/Auth/ForgotPasswordScreen';
import BottomNavigator from './BottomNavigator'
import DrawerNavigatior from './DrawerNavigatior'
import HomeScreen from '../Screen/Dashboard/HomeScreen';
import FaqScreen from '../Screen/FAQ/FaqScreen';
import ReportScreen from '../Screen/Report/ReportScreen';
import FavouriteScreen from '../Screen/Favourite/FavouriteScreen';
import EditProfileScreen from '../Screen/EditProfile/EditProfileScreen';
import Profile from '../Screen/EditProfile/Profile';
import PostScreen from '../Screen/Post/PostScreen';
import SettingScreen from '../Screen/Setting/SettingScreen';
import DynamicLinkHandler from '../Utils/DynamicLinkHandler';


const Stack = createStackNavigator();


const AuthStackNavigator = () => {
  

  return (
    <Stack.Navigator initialRouteName={"SplashScreen"} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="FaqScreen" component={FaqScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="PostScreen" component={PostScreen} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
    </Stack.Navigator>
  )
}



export default AuthStackNavigator;