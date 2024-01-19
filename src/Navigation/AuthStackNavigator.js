import React, { useEffect, useState } from 'react'
import { Linking } from 'react-native'
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
import Profile from '../Screen/EditProfile/Profile';
import PostScreen from '../Screen/Post/PostScreen';
import DetailsPostScreen from '../Screen/Post/DetailsPostScreen';
import SettingScreen from '../Screen/Setting/SettingScreen';
import ChatScreen from '../Screen/Chat/ChatScreen';
import DynamicLinkHandler from '../Utils/DynamicLinkHandler';
import { Animated } from 'react-native'
import InternetConnectivity from '../Component/InternetConnectivity';
import { View } from 'react-native-animatable';

const Stack = createStackNavigator();


const AuthStackNavigator = () => {

  const SlideFromRight = ({ current, next, inverted, layouts }) => {
    const progress = Animated.add(
      current.progress,
      next
        ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        })
        : 0
    );

    const translateX = Animated.multiply(
      progress.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [
          layouts.screen.width, // Offscreen to the right
          0, // Onscreen
          -layouts.screen.width, // Offscreen to the left
        ],
      }),
      inverted
    );

    return {
      cardStyle: {
        transform: [{ translateX }],
      },
      transitionSpec: {
        open: { animation: 'timing', config: { duration: 300 } },
        close: { animation: 'timing', config: { duration: 300 } },
      },
    };
  };

  return (
   
        <Stack.Navigator initialRouteName={"SplashScreen"} screenOptions={{
          headerShown: false,
          cardStyleInterpolator: SlideFromRight,
          
          
        
        }} >

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
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SettingScreen" component={SettingScreen} />
          <Stack.Screen name="PostScreen" component={PostScreen} />
          <Stack.Screen name="UserDetails" component={UserDetails} />
          <Stack.Screen name="DetailsPostScreen" component={DetailsPostScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
 
  )
}



export default AuthStackNavigator;