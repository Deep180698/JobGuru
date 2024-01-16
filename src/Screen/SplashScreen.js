import { View, Text, Image, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native'
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
      throw new Error("User isn't logged in");
    }

  },
    []);

  const _NextPage = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "AuthScreen" }],
    });
  }
  const screenChange = (name) => {
    setScreenName(name)
  }
  const FirstScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Animatable.Image duration={2000} animation="zoomIn" resizeMode='contain'
          source={require('../assets/logo.png')}
          style={[styles.logoStyle]} />
        <FAB
          icon="chevron-right"
          color={color.black}
          rippleColor={color.white}
          customSize={PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get())}
          style={styles.fab}
          onPress={() => screenChange('secondScreen')}
        />
      </View>
    )
  }
  const SecondScreen = () => {
    return (
      <View style={{ flex: 1 }}>


        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Animatable.Image duration={2000} animation="zoomIn" resizeMode='contain'
            source={require('../assets/logo.png')}
            style={[styles.secondScreenlogoStyle]} />
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { textAlign: 'center', fontSize: 18 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold }]}>{'Welcome to JobGuru'}</Animatable.Text>
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { textAlign: 'center', fontFamily: FontFamily.Roboto_Regular }]}>{'Your Gateway to Career Opportunities'}</Animatable.Text>
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { textAlign: 'center', fontFamily: FontFamily.Roboto_LightItalic }]}>{'Embark on a journey towards your dream career with JobGuru. Our job search platform is designed to connect you with meaningful employment opportunities tailored to your skills and aspirations.'}</Animatable.Text>
        </View>
        <FAB
          icon="chevron-right"
          color={color.black}
          rippleColor={color.white}
          customSize={PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get())}
          style={styles.fab}
          onPress={() => screenChange('thirdScreen')}
        />
        <FAB
          icon="chevron-left"
          color={color.black}
          rippleColor={color.white}
          customSize={PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get())}
          style={[styles.fab1]}
          onPress={() => screenChange('firstScreen')}
        />
      </View>

    )
  }
  const ThirdScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <Animatable.Image duration={2000} animation="zoomIn" resizeMode='contain'
          source={require('../assets/logo.png')}
          // zoomIn
          style={[styles.thirdScreenlogoStyle]} />
        <View style={{ flex: 1, }}>
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { fontSize: 18 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold }]}>{'Effortless Job Discovery'}</Animatable.Text>
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { fontFamily: FontFamily.Roboto_Regular }]}>{'Explore a vast array of job listings from top companies in various industries'}</Animatable.Text>
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { fontSize: 18 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold }]}>{'Personalized Recommendations'}</Animatable.Text>
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { fontFamily: FontFamily.Roboto_Regular }]}>{'Receive tailored job suggestions based on your skills, experience, and preferences'}</Animatable.Text>
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { fontSize: 18 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold }]}>{'Seamless Application Process'}</Animatable.Text>
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { fontFamily: FontFamily.Roboto_Regular }]}>{'Apply to your desired positions with just a few taps, and track your application status effortlessly'}</Animatable.Text>
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { fontSize: 18 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold }]}>{'Networking Opportunities'}</Animatable.Text>
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { fontFamily: FontFamily.Roboto_Regular }]}>{'Connect with professionals in your field, attend industry events, and expand your professional network'}</Animatable.Text>
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { fontSize: 18 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold }]}>{'Resourceful Career Insights'}</Animatable.Text>
          <Animatable.Text duration={1500} animation={'zoomIn'} style={[styles.textStyles, { fontFamily: FontFamily.Roboto_Regular }]}>{'Access career resources, interview tips, and industry insights to enhance your job search strategy'}</Animatable.Text>
        </View>
        <FAB
          icon="chevron-right"
          color={color.black}
          rippleColor={color.white}
          customSize={PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get())}
          style={styles.fab}
          onPress={() => _NextPage()}
        />
        <FAB
          icon="chevron-left"
          color={color.black}
          rippleColor={color.white}
          customSize={PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get())}
          style={[styles.fab1]}
          onPress={() => screenChange('secondScreen')}
        />
      </View>

    )
  }

  return (
    <View style={styles.container}>
      {screenName === 'firstScreen' ? FirstScreen() : null}
      {screenName === 'secondScreen' ? SecondScreen() : null}
      {screenName === 'thirdScreen' ? ThirdScreen() : null}

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.black,
    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),

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