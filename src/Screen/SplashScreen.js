import { View, Text, Image, StyleSheet, PixelRatio } from 'react-native'
import React, { useEffect } from 'react'
import color from '../Utils/Color'
import AppConstants from '../Storage/AppConstants'
import { useDispatch } from 'react-redux'
import cacheData from '../../src/Storage/cacheData'
import * as Animatable from 'react-native-animatable';
import { authFunc } from '../Storage/Action'
const SplashScreen = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(async () => {
      try {
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
          throw new Error("User isn't logged in");
        }
      } catch (err) {
        props.navigation.reset({
          index: 0,
          routes: [{ name: "AuthScreen" }],
        });
      }
    }, 3000);
  },
    []);

  return (
    <View style={styles.container}>
      <Animatable.Image duration={2000} animation="zoomInUp" resizeMode='contain'
        source={require('../assets/logo.png')}
        style={styles.logoStyle} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.black,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(250 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(250 / PixelRatio.get())
  }
})

export default SplashScreen