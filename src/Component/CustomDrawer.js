import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import color from '../Utils/Color';


const CustomDrawer = ({ isVisible, onPress }) => {
  return (
    <View style={styles.container}>

      <Animatable.View
        animation={isVisible ? 'slideInLeft' : 'lightSpeedIn'}
        duration={500}
        style={styles.drawer}
      >
      </Animatable.View>
      <Animatable.View
        animation={'fadeIn'}
        duration={500}
        style={styles.viewStyle1}

      >
        <TouchableOpacity activeOpacity={1} style={{ flex: 1, backgroundColor: color.tranperant }} onPress={onPress}>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flexDirection: 'row',
  },
  drawer: {
    flex: 0.7,
    backgroundColor: color.black,

  },
  viewStyle1: {
    flex: 0.3,
  },

});

export default CustomDrawer;
