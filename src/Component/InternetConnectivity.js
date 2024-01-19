import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, PixelRatio } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import color from '../Utils/Color';
import FontFamily from '../Utils/FontFamily';

const InternetConnectivity = ({ onConnectionChange }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);

    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isConnected) {
    // If connected, render your regular content
    return null;
  }

  // If not connected, render the no internet connection component
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image
          resizeMode='contain'
          source={require('../assets/NoInternet.jpg')}
          style={styles.imageStyle}
        />
        <Text style={[styles.textStyle, {fontFamily:FontFamily.Roboto_Bold, marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }]}>{'Ooops !!'}</Text>
        <Text style={[styles.textStyle, { fontSize: 14 / PixelRatio.getFontScale() }]}>{'Internet connection not found'}</Text>
        <Text style={[styles.textStyle, { fontSize: 14 / PixelRatio.getFontScale() }]}>{'Check the connection '}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: color.black,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  textStyle: {
    fontSize: 16 / PixelRatio.getFontScale(),
    color: color.white,
    fontFamily: FontFamily.Roboto_Light,
    textAlign: 'center',
  },
  imageStyle: {
    alignSelf: 'center',
    width: '90%',
    height: PixelRatio.getPixelSizeForLayoutSize(250 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
  },
});

export default InternetConnectivity;
