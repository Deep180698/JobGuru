// App.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import HomeScreen from '../Screen/Dashboard/HomeScreen';
import ChatScreen from '../Screen/Chat/ChatScreen';
import color from '../Utils/Color';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();


const App = () => {
  return (
    <View style={{flex:1,backgroundColor:color.bgWhite,}}>
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: 'home',
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: 'Chat',
          }}
        />

      </Tab.Navigator>
    </View>
  );
};

export default App;
