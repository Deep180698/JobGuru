import { View, Text, Image, StyleSheet, PixelRatio, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../Utils/Color'
import AppConstants from '../Storage/AppConstants'
import { useDispatch } from 'react-redux'
import cacheData from '../../src/Storage/cacheData'
import * as Animatable from 'react-native-animatable';
import { authFunc } from '../Storage/Action'
import Entypo from 'react-native-vector-icons/Entypo'
import FontFamily from '../Utils/FontFamily'
import { Avatar, Button, Card, FAB } from 'react-native-paper';
// Assuming this component file is in the same directory as the assets folder
import startImage from '../assets/Start.jpg';
const { height, width } = Dimensions.get('screen')
const SplashScreen = (props) => {

  const [screenName, setScreenName] = useState('firstScreen')
  const dispatch = useDispatch()

  useEffect(async () => {

    const isLoggedIn = await cacheData.getDataFromCachedWithKey(
      AppConstants.AsyncKeyLiterals.isLoggedIn,
    );

    if (isLoggedIn) {
      const userData = await cacheData.getDataFromCachedWithKey(
        AppConstants.AsyncKeyLiterals.IS_AUTH,
      );
      if (userData && userData !== undefined && userData !== null) {
        dispatch(authFunc(userData))

        setTimeout(() => {
          props.navigation.reset({
            index: 0,
            routes: [
              {
                name: "BottomNavigator",
              },
            ],
          });
        }, 500);
      } else {
        throw new Error('No user data!');
      }
    } else {
      setTimeout(() => {
        props.navigation.reset({
          index: 0,
          routes: [{ name: "OnBordingScreen" }],
        });
      }, 2000);
     
      throw new Error("User isn't logged in");
    }

  },
    []);




  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ImageBackground style={{ height: height, width: width }} source={startImage}>
          <Animatable.View duration={3000} animation={'fadeIn'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Image resizeMode='contain'
              source={require('../assets/logo4.png')}
              style={[styles.logoStyle]} />

          </Animatable.View>
          <FAB
            icon="chevron-right"
            color={color.black}
            rippleColor={color.white}
            customSize={PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get())}
            style={styles.fab}
            onPress={() => screenChange('secondScreen')}
          />
        </ImageBackground>
      </View>

    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,

  },
  logoStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get())
  },
  secondScreenlogoStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(120 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(120 / PixelRatio.get())
  },
  thirdScreenlogoStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
  },
  fab: {
    position: 'absolute',
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    padding: PixelRatio.getPixelSizeForLayoutSize(0 / PixelRatio.get()),
    margin: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    right: 0,
    backgroundColor: color.white,
    bottom: 0,
  },
  fab1: {
    position: 'absolute',
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    padding: PixelRatio.getPixelSizeForLayoutSize(0 / PixelRatio.get()),
    margin: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    left: 0,
    backgroundColor: color.white,
    bottom: 0,
  },
  textStyles: {
    color: color.white,
    fontSize: 12 / PixelRatio.getFontScale(),
    fontFamily: FontFamily.Roboto_Regular,
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),

  },
})

export default SplashScreen