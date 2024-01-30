import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions, StyleSheet, PixelRatio } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import color from '../Utils/Color';
const ImageCarousel = ({ images, paginationStyle,style }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width/2-10;

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth );
    setActiveIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      {images.length >1 ?
        <View style={styles.container}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={200}
          >
            {images.map((image, index) => (
              <Image key={index} source={{ uri: image.uri }} style={style} />
            ))}
          </ScrollView>
          <View style={[styles.pagination, paginationStyle]}>
            {images.map((_, index) =>  (
              <Entypo name='dot-single' size={20 / PixelRatio.getFontScale()} color={index  == activeIndex ? color.golden : color.black} />
            ))}
          </View>
        </View>
        : 
        <Image source={{ uri: images[0].uri }} style={style} />
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },

});

export default ImageCarousel;
