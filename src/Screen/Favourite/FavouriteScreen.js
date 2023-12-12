import { StyleSheet, Text, View, FlatList, PixelRatio, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'
import JSONList from '../../JSON/JSONList'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import CustomBottomSheet from '../../Component/CustomBottomSheet'
import FontFamily from '../../Utils/FontFamily'
import * as Animatable from 'react-native-animatable';

const FavouriteScreen = (props) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {

    setData(JSONList.DashboardList)


  }, [])

  const onSelectFavourite = (item, index) => {

    const newArray = data;
    newArray.map((i) => {
      if (item.id === i.id) {

        i.isFavourite = !i.isFavourite
      }
    })

    console.log(newArray);
    setData([...newArray]);

  }
  // render list
  const renderItem = ({ item, index }) => {

    return (
      <View style={{ backgroundColor: color.black }}>
        {/* Header of post */}
        <View style={{
          marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
          marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Image source={{ uri: item.useData.profilePic }} style={styles.profileStyle} />
          <Text style={[styles.textStyle, { flex: 1, fontFamily:FontFamily.Roboto_Regular,fontSize: 14 / PixelRatio.getFontScale(), marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{item.useData.Name}</Text>

          <TouchableOpacity activeOpacity={0.6} onPress={() => setIsOpen(true)}>
            <Entypo name={'dots-three-vertical'} color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} />
          </TouchableOpacity>
        </View>
        {/* Body od post */}
        <View>
          <Image source={{ uri: item.images }} style={styles.imageStyle} />
          <View style={styles.heartPositionStyle}>
          <TouchableOpacity style={styles.heartPositionStyle} onPress={() => onSelectFavourite(item, index)}>
          <Animatable.View
            animation={ 'bounceIn' }
          >
            <FontAwesome
              name={ 'heart'}
              size={30}
              color={item.isFavourite ? color.white : color.white}
            />
          </Animatable.View>
        </TouchableOpacity>
          </View>
        </View>
        {/* description */}
        <View style={{
          marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
          marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),

        }}>
          <Text style={[styles.textStyle]}>{item.Title}</Text>
          <Text style={[styles.textStyle, { fontSize: 12 / PixelRatio.getFontScale() }]}>{item.Description}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
            <Header screenName={"normal"} title={'Favourite'}onPress={() => props.navigation.goBack()} />

      <FlatList
        data={data}
        renderItem={renderItem}
      />
      <CustomBottomSheet onClose={() => setIsOpen(false)} isOpen={isOpen} />

    </View>
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.black
  },
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(250 / PixelRatio.get()),
  },
  profileStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()),
    resizeMode: "contain"
  },
  iconStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    resizeMode: "cover",

  },
  heartPositionStyle: {
    position: 'absolute',
    right: 0,
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
  },
  textStyle: {
    fontSize: 14 / PixelRatio.getFontScale(),
    color: color.white,
    fontFamily:FontFamily.Roboto_Light

  },
})