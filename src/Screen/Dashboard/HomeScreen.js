import { StyleSheet, FlatList, View, RefreshControl, Text, Image, PixelRatio, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Header from '../../Component/Header'
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import color from '../../Utils/Color'
import { Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable';
import FontFamily from '../../Utils/FontFamily';
import apiCall from '../../Utils/apiCall';
import AppConstants from '../../Storage/AppConstants';
import cacheData from '../../Storage/cacheData';
import axios from 'axios';
import ImageCarousel from '../../Component/ImageCarousel';
import CustomButton from '../../Component/CustomButton';
import CustomLoader from '../../Component/CustomLoader';
import NoRecordFound from '../../Component/NoRecordFound';
import CustomNormalRBottomSheet from '../../Component/CustomNormalRBottomSheet';
const { width, height } = Dimensions.get('window');
let isMyPost = false
const HomeScreen = (props, { navigation }) => {

  const flatListRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [searchText, setSearchText] = useState('')
  const [postID, setPostID] = useState('')
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

    getBannerData()
    getPostData()
  }, [isOpen])


  const getBannerData = async () => {

    const result = await apiCall.apiGETCall(AppConstants.AsyncKeyLiterals.getField);

    setBannerData(result)

  }
  const getPostData = async () => {
    const headers = {
      'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
    }

    const result = await apiCall.apiGETCall(AppConstants.AsyncKeyLiterals.getPost, headers);
    setRefreshing(false)
    setData(result)

  }
  const onSelectFavourite = async (item, index) => {

    const headers = {
      'Content-Type': 'application/json',
      'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
    }

    const data1 = await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.IS_AUTH)
    const body = {
      "postID": item._id,
      "UserID": data1.data._id,
      "isFavourite": !item.isFavourite

    }
    await axios({
      method: 'POST',
      url: AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.postFavourite,
      data: body,
      headers: headers
    }).then(response => {

      console.log(response.data);
      const newArray = data;
      newArray.map((i) => {
        if (item._id === i._id) {

          i.isFavourite = !i.isFavourite
        }
      })

      setData([...newArray]);
    });

  }
  const onPostDelete = async () => {

    const headers = {
      'Content-Type': 'application/json',
      'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
    }

    // const data1 = await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.IS_AUTH)
    // const body = {
    //   "postID": item._id,
    //   "UserID": data1.data._id,
    //   "isFavourite": !item.isFavourite

    // }
    await axios({
      method: 'DELETE',
      url: AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.getPostDelete + postID,
      data: body,
      headers: headers
    }).then(response => {

      console.log(response.data);
      const newArray = data;
      newArray.map((i) => {
        if (item._id === i._id) {

          i.isFavourite = !i.isFavourite
        }
      })

      setData([...newArray]);
    });

  }
  const onSelectType = (item) => {

    const newArray = data;
    newArray.map((i) => {
      if (item._id === i._id) {

        i.isShow = !i.isShow
      }
    })
    setData([...newArray]);

  }
  const onNavigateScreen = (item) => {

    switch (item) {
      case 'post':
        props.navigation.navigate('PostScreen')
        break;
      default:
        break;
    }
  }

  // banner item
  const renderItem1 = ({ item }) => (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onSelectType(item)} style={styles.bannerItem}>
      <View style={{
        backgroundColor: color.white,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
      }}>
        <Image source={{ uri: item.icon }} style={styles.iconStyle} />
      </View>
      <Text style={styles.bannerText}>{item.typeName}</Text>
    </TouchableOpacity>
  );
  const renderImageItem = (item) => {
    return (
      <Image style={styles.imageStyle} source={{ uri: item.uri }} />
    )
  }
  // render list
  const renderItem = ({ item, index }) => {

    const formattedImages = item?.images.map((image) => ({
      uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + image?.name
    }));

    return (

      <View style={styles.container}>
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
    <View style={{ flex: 1, backgroundColor: color.bgWhite }}>
      {/* Header */}
      <CustomLoader isVisible={false} />
      <Header screenName={'Home'} title={"Dashboard"} onNavigate={(item) => onNavigateScreen(item)} onPress={() => props.navigation.openDrawer()} />
      <ScrollView style={{ backgroundColor: color.bgWhite, flex: 1 }} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            getPostData();
          }}
        />
      } showsVerticalScrollIndicator={false}>

        {/* Searchbar */}
        {/* <View style={{ backgroundColor: color.black, paddingBottom: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()) }}>
          <Searchbar
            style={styles.searchbarStyle}
            value={searchText}
            inputStyle={styles.textStyle}
            textAlignVertical='top'
            onChangeText={(i) => setSearchText(i)}
            placeholder='search job'
          />
        </View> */}
        {/* banner */}
        <Animatable.View style={{ backgroundColor: color.bgWhite, flex: 1 }} duration={PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get())} animation={"slideInUp"}>
          {/* <FlatList
            data={bannerData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem1}
            horizontal
            showsHorizontalScrollIndicator={false}
           
          /> */}
          {/* List Data */}
          <FlatList
            ref={flatListRef}
            data={data}
            numColumns={2}
            renderItem={renderItem}
            ListEmptyComponent={() => {
              return (
                <NoRecordFound title={"No Post Found"} />
              )
            }}
          />
        </Animatable.View>
        <CustomNormalRBottomSheet Height={PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get())} data={(i) => { console.log(i) }} onClose={() => closeBottomSheet()} getCall={'myPostContainer'} refBottomSheet={bottomSheetRef} />
        <CustomNormalRBottomSheet Height={PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get())} onClose={() => closeBottomSheet1()} getCall={'otherPostContainer'} refBottomSheet={bottomSheetRef1} />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

  imageStyle: {
    width: width,
    height: PixelRatio.getPixelSizeForLayoutSize(250 / PixelRatio.get()),
  },
  profileStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()),
    resizeMode: "contain"
  },
  iconStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    resizeMode: "cover",
  },
  buttonPositionStyle: {
    alignSelf: 'center',
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
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) / PixelRatio.get()),
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    borderTopLeftRadius: PixelRatio.getPixelSizeForLayoutSize(PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) / PixelRatio.get()),
    borderTopRightRadius: PixelRatio.getPixelSizeForLayoutSize(PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) / PixelRatio.get()),
    justifyContent: 'center',
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
    height: PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    backgroundColor: color.white
  },
  containerImageStyle: {
    borderRadius: 20,
    resizeMode: 'stretch',
    width: width / 2 - PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), // Adjusted width
    height: height * 0.3, // Adjust the percentage as needed
  },
  container: {
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