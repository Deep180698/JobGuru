import { StyleSheet, Text, View, ScrollView,FlatList,RefreshControl, PixelRatio, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'
import JSONList from '../../JSON/JSONList'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import FontFamily from '../../Utils/FontFamily'
import * as Animatable from 'react-native-animatable';
import cacheData from '../../Storage/cacheData'
import AppConstants from '../../Storage/AppConstants'
import axios from 'axios'
import ImageCarousel from '../../Component/ImageCarousel'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from '../../Component/CustomButton'
import NoRecordFound from '../../Component/NoRecordFound'

const FavouriteScreen = (props) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {

    getPostData()

  }, [])

  const getPostData =async()=>{
    
    const headers = {
      'Content-Type': 'application/json',
      'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
    }
    
    await axios({
      method: 'GET',
      url: AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.getFavourite,
      headers: headers
    }).then(response => {

        setData(response.data.data);
    });
  }
  const onSelectFavourite = async(item, index) => {

    const headers = {
      'Content-Type': 'application/json',
      'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
    }
    const body = {
      "postID": item._id,
      "isFavourite": !item.isFavourite

    }
    await axios({
      method: 'POST',
      url: AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.postFavourite,
      data: body,
      headers: headers
    }).then(response => {
      console.log(response.data);
      // const newArray = data;
      // newArray.map((i) => {
      //   if (item._id === i._id) {

      //     i.isFavourite = !i.isFavourite
      //   }
      // })

      // setData([...newArray]);
    });


  }
  // render list
  const renderItem = ({ item, index }) => {
    
    const formattedImages = item?.images.map((image) => ({
      uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + image?.name
    })) ;


    return (
      <View style={{backgroundColor:color.white}}>
        {/* Header of post */}
        <View style={{
          marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
          marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Image source={{ uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + item.UserData.profileImage }} style={styles.profileStyle} />
          <Text style={[styles.textStyle, { flex: 1, fontSize: 14 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Regular, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{item.UserData.firstName} {item.UserData.lastName}</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={() => openBottomSheet()}>
            <Entypo name={'dots-three-vertical'} color={color.black} size={PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get())} />
          </TouchableOpacity>
        </View>
        {/* Body od post */}
        <View activeOpacity={0.8}>
          <View style={{ flex: 1 }}>
            <ImageCarousel paginationStyle={{ position: 'relative' }} images={formattedImages} />
          </View>

          <View style={styles.buttonPositionStyle}>
            <CustomButton press={() => props.navigation.navigate('DetailsPostScreen', { postData: item })} text={"Apply"} style={{ backgroundColor: color.black, paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), borderRadius: PixelRatio.getPixelSizeForLayoutSize(0 / PixelRatio.get()) }} textStyle={{ color: color.white }} />
          </View>
        </View>
        {/* description */}
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{
            flex: 1,
            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
            paddingLeft: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.textStyle]}>{item.title}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.textStyle, { fontSize: 12 / PixelRatio.getFontScale() }]}>{item.additionalNote}</Text>
            </View>
          </View>
          <TouchableOpacity style={{ marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }} onPress={() => onSelectFavourite(item, index)}>
            <Animatable.View animation={item.isFavourite ? 'bounceIn' : null}>
              <MaterialCommunityIcons
                name={item.isFavourite ? 'bookmark' : 'bookmark-outline'}
                size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())}
                color={color.black}
              />
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header screenName={"normal"} title={'Favourite'} onPress={() => props.navigation.goBack()} />
    
        {/* <Animatable.View duration={1000} animation={"slideInUp"}> */}
      
          <FlatList
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={() => {
              return (
                  <NoRecordFound title={"No Post Found"}/>
              )
            }}
          />
        {/* </Animatable.View> */}
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
    fontSize: 12 / PixelRatio.getFontScale(),
    color: color.white,
    fontFamily: FontFamily.Roboto_Light

  },
   buttonPositionStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get())
  },
})