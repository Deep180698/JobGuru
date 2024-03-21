// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, PixelRatio ,Dimensions} from 'react-native';
import color from '../Utils/Color';
import FontFamily from '../Utils/FontFamily';

const {height ,width} = Dimensions.get('window')
const CustomButton = ({ onPress, text, backgroundColor, textColor ,btnStyle}) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.6} 
      onPress={onPress} 
      style={[styles.button, { backgroundColor },btnStyle]}>
      <Text style={[styles.text, {color:textColor} ]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),    
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),    
  },
  text: {
    fontSize: 16/PixelRatio.getFontScale(),
    fontFamily: FontFamily.Roboto_Regular,
    textAlign:'center'
  },
});

export default CustomButton;
