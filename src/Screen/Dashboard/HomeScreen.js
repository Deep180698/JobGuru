import { StyleSheet, FlatList, View, RefreshControl, Text, Image, PixelRatio, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Header from '../../Component/Header'
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
const { width, height } = Dimensions.get('screen')
let isMyPost = false
const HomeScreen = (props, { navigation }) => {

  const flatListRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [searchText, setSearchText] = useState('')
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
      <View style={{
        width: Dimensions.get('window').width / 2 - PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), // Adjusted width
        backgroundColor: color.white,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
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
          <TouchableOpacity activeOpacity={0.6} onPress={() => openBottomSheet()}>
            <Entypo name={'dots-three-vertical'} color={color.black} size={PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get())} />
          </TouchableOpacity>
        </View>
        {/* Body od post */}
        <View activeOpacity={0.8} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ImageCarousel paginationStyle={{ position: 'relative' }} style={styles.containerImageStyle} images={formattedImages} />
          </View>
        </View>
        {/* description */}

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            flex: 1,
            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
            paddingLeft: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text numberOfLines={2} style={[styles.textStyle]}>{item.title}</Text>
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
        <Animatable.View style={{ backgroundColor: color.bgWhite, flex: 1 }} duration={1000} animation={"slideInUp"}>
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
            style={{ marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}
            ListEmptyComponent={() => {
              return (
                <NoRecordFound title={"No Post Found"} />
              )
            }}
          />
        </Animatable.View>
        <CustomNormalRBottomSheet Height={100} onClose={() => closeBottomSheet()} getCall={'myPostContainer'} refBottomSheet={bottomSheetRef} />
        <CustomNormalRBottomSheet Height={100} onClose={() => closeBottomSheet1()} getCall={'otherPostContainer'} refBottomSheet={bottomSheetRef1} />
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
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    borderTopLeftRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    borderTopRightRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
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
    backgroundColor: color.white,
    resizeMode: 'contain',
    width: Dimensions.get('window').width/2  - PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    height: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()), // adjust the height as needed
  }
})