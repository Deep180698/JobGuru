import { StyleSheet, Text, View, Dimensions,ScrollView,FlatList,RefreshControl, PixelRatio, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
import CustomNormalRBottomSheet from '../../Component/CustomNormalRBottomSheet'
const { width, height } = Dimensions.get('screen')

const FavouriteScreen = (props) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const bottomSheetRef = useRef();
  const bottomSheetRef1 = useRef();
  const openBottomSheet = async (item) => {
    bottomSheetRef.current.open();
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
  };
  const openBottomSheet1 = async (item) => {
    bottomSheetRef1.current.open();
  };
  const closeBottomSheet1 = () => {
    bottomSheetRef1.current.close();
  };
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
      console.log("response.data",response.data.postData);

        setData(response.data.postData);
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
     if (condition) {
       const newArray = data;
       newArray.map((i) => {
         if (item._id === i._id) {
 
           i.isFavourite = !i.isFavourite
         }
       })
 
       setData([...newArray]);
     } else {
      
     }
    });


  }
  // render list
  const renderItem = ({ item, index }) => {
    console.log("item?.isMyPost",item?.isMyPost);
    const formattedImages = item?.images.map((image) => ({
      uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + image?.name
    }));

    console.log(item);
    return (
      <View style={{
        backgroundColor: color.white,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
      }}>

        {/* Header of post */}
        <View style={{
          marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
          marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Image source={{ uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + item.UserData.profileImage }} style={styles.profileStyle} />
          <Text style={[styles.textStyle, { flex: 1, fontSize: 14 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Regular, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{item.UserData.firstName} {item.UserData.lastName}</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={() => item.isMyPost === true || item?.isMyPost === undefined ? openBottomSheet() : openBottomSheet1()}>
            <Entypo name={'dots-three-vertical'} color={color.black} size={PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get())} />
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', borderWidth: 0.5, borderColor: color.offWhite }} />
        {/* Body od post */}
        <View activeOpacity={0.8} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ImageCarousel paginationStyle={{ position: 'relative' }} images={formattedImages} />
          </View>



        </View>
        <View style={{ width: '100%', borderWidth: 0.5, borderColor: color.offWhite }} />
        {/* description */}

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
        <View style={styles.buttonPositionStyle}>
          <CustomButton press={() => props.navigation.navigate('DetailsPostScreen', { postData: item })} text={"Apply Now"} style={{ backgroundColor: color.black, paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()) }} textStyle={{ color: color.white }} />
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
            contentContainerStyle={{marginTop:PixelRatio.getPixelSizeForLayoutSize(10/PixelRatio.get())}}
            ListEmptyComponent={() => {
              return (
                  <NoRecordFound title={"No Post Found"}/>
              )
            }}
          />
        {/* </Animatable.View> */}
        <CustomNormalRBottomSheet Height={100} onClose={() => closeBottomSheet()} getCall={'myPostContainer'} refBottomSheet={bottomSheetRef} />
        <CustomNormalRBottomSheet Height={100} onClose={() => closeBottomSheet1()} getCall={'otherPostContainer'} refBottomSheet={bottomSheetRef1} />
    </View>
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bgWhite
  },
 
  imageStyle: {
    width: width,
    height: PixelRatio.getPixelSizeForLayoutSize(250 / PixelRatio.get()),
  },
  profileStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()),
    resizeMode: "contain"
  },
  iconStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    resizeMode: "cover",
  },
  buttonPositionStyle: {
    alignSelf: 'flex-start',
    margin: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),

  },
  textStyle: {
    fontSize: 12 / PixelRatio.getFontScale(),
    color: color.black,
    fontFamily: FontFamily.Roboto_Light
  },
  bannerItem: {
    width: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()), // Set the width of each banner item
    backgroundColor: color.white,
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    borderTopLeftRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    borderTopRightRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    justifyContent: 'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    height: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get())
  },
  bannerText: {
    color: color.black,
    fontSize: 12 / PixelRatio.getFontScale(),
    paddingTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    fontFamily: FontFamily.Roboto_Medium
  },
  searchbarStyle: {
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    height: 40,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    backgroundColor: color.white
  }
})