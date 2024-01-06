import { StyleSheet, Text, View, PixelRatio } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import color from '../Utils/Color'
import FontFamily from '../Utils/FontFamily'

const CustomButton = ({ style, text, press, textStyle }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={(press)} style={[styles.btnStyles, style]}>
      <Text style={[styles.textStyles, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  btnStyles: {
    backgroundColor: color.black,
    padding: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
  },
  textStyles: {
    color: color.white,
    fontSize: 14 / PixelRatio.getFontScale(),
    textAlign: 'center',
    fontFamily: FontFamily.Roboto_Regular
    
  }
})