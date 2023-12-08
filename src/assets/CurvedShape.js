import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import color from '../Utils/Color';

const TopCurve = () => {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        <Path
          d="M 0 0 L 0 80 Q 190 0, 450 100 L 500 0 Z"
          fill={color.black}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopCurve;
