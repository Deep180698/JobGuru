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
import Ionicons from "react-native-vector-icons/Ionicons";
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
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{

    })
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

    const formattedImages = item?.images.map((image) => ({
      uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + image?.name
    }));

    return (

      <View style={styles.container1}>
        <View style={styles.cardContainer}>
          <View style={styles.imageContainer}>
            <ImageCarousel paginationStyle={{ position: 'relative' }} style={styles.containerImageStyle} images={formattedImages} />
          </View>
          <TouchableOpacity style={styles.favoriteButton} onPress={() => onSelectFavourite(item, index)}>
            <Animatable.View animation={item.isFavourite ? 'bounceIn' : null}>
              <Ionicons
                name={item.isFavourite ? 'heart' : 'heart-outline'}
                size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())}
                color={color.white}
              />
            </Animatable.View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate('DetailsPostScreen', { postData: item })}
            style={styles.detailsContainer}
          >
            <Image source={{ uri: `${AppConstants.AsyncKeyLiterals.Base_URL}/${item.UserData.profileImage}` }} style={styles.profileStyle} />
            <Text numberOfLines={2} style={[styles.textStyle, { flex: 1, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>
              {item.title}
            </Text>
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
            numColumns={2}
            renderItem={renderItem}
            style={{ marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}
            ListEmptyComponent={() => {
              return (
                <NoRecordFound title={"No Post Found"} />
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
  },

  containerImageStyle: {
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
    resizeMode: 'stretch',
    width: width / 2 - PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), // Adjusted width
    height: height * 0.3, // Adjust the percentage as needed
  },
  container1: {
    width: width / 2 - PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), // Adjusted width
    margin:PixelRatio.getPixelSizeForLayoutSize(5/PixelRatio.get())
  },
  cardContainer: {
    backgroundColor: color.white,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    backgroundColor: color.white,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  favoriteButton: {
    position: 'absolute',
    backgroundColor: color.transparent,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    padding: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
  },
  detailsContainer: {
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    flexDirection: 'row',
    alignItems: 'center',
  },
})