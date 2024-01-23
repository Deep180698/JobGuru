import { StyleSheet, Text, View, PixelRatio } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import color from '../Utils/Color'
import FontFamily from '../Utils/FontFamily'
import * as Animatable from 'react-native-animatable';

const CustomButton = ({ style, text, press, textStyle }) => {
  return (
    <TouchableOpacity  activeOpacity={0.6} onPress={(press)} style={[styles.btnStyles, style]}>
      <Animatable.Text duration={1000} animation={'fadeIn'} style={[styles.textStyles, textStyle]}>{text}</Animatable.Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  btnStyles: {
    backgroundColor: color.black,
    padding: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    elevation: 5, // Change this value as needed
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  textStyles: {
    color: color.white,
    fontSize: 12 / PixelRatio.getFontScale(),
    textAlign: 'center',
    fontFamily: FontFamily.Roboto_Light
    
  }
})