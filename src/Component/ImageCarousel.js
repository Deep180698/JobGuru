import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions, StyleSheet, PixelRatio } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import color from '../Utils/Color';
const ImageCarousel = ({ images,paginationStyle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
    setActiveIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={200}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.image} />
        ))}
      </ScrollView>
      <View style={[styles.pagination,paginationStyle]}>
        {images.map((_, index) => (
        //   <Text key={index} style={index === activeIndex ? styles.activeDot : styles.dot}>
        //     ●
        //   </Text>
          <Entypo name='dot-single' size={20/PixelRatio.getFontScale()} color={index === activeIndex ? color.golden: color.white} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: PixelRatio.getPixelSizeForLayoutSize(250/PixelRatio.get()), // adjust the height as needed
  },
  pagination: {
    position:'absolute',
    bottom:0,
    flexDirection: 'row',
    alignSelf: 'center',
  },

});

export default ImageCarousel;
