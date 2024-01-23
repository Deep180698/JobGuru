// App.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import HomeScreen from '../Screen/Dashboard/HomeScreen';
import ChatScreen from '../Screen/Chat/ChatScreen';
import color from '../Utils/Color';
import { View } from 'react-native';
import PostScreen from '../Screen/Post/PostScreen';
import ImageSelection from '../Screen/Post/ImageSelection';
import Profile from '../Screen/EditProfile/Profile';

const Tab = createBottomTabNavigator();


const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: color.bgWhite, }}>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: 'home',
          }}
        />
        <Tab.Screen
          name="ImageSelection"
          component={ImageSelection}
          options={{
            tabBarIcon: 'Plus',
          }}
        />

        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: 'Chat',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: 'user',
          }}
        />

      </Tab.Navigator>
    </View>
  );
};

export default App;
