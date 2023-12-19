import { StyleSheet, FlatList, View, Text, Image, PixelRatio, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Header from '../../Component/Header'
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import color from '../../Utils/Color'
import { Searchbar } from 'react-native-paper';
import CustomBottomSheet from '../../Component/CustomBottomSheet';
import { useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable';
import FontFamily from '../../Utils/FontFamily';
import apiCall from '../../Utils/apiCall';
import AppConstants from '../../Storage/AppConstants';
import { SliderBox } from "react-native-image-slider-box";
import cacheData from '../../Storage/cacheData';

const HomeScreen = (props, { navigation }) => {

  const flatListRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [searchText, setSearchText] = useState('')

  const data1 = useSelector((state) => state.reducer)

  useEffect(() => {

    getBannerData()
    getPostData()
  }, [isOpen])


  const getBannerData = async () => {

    const result = await apiCall.apiGETCall(AppConstants.AsyncKeyLiterals.getField);
    console.log("result.data", result);

    setBannerData(result)

  }
  const getPostData = async () => {
    const headers = {
      'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
    }

    const result = await apiCall.apiGETCall(AppConstants.AsyncKeyLiterals.getPost, headers);
    console.log("result.data", result);

    setData(result)

  }
  const onSelectFavourite = async (item, index) => {


    const headers = {
      'Content-Type':'application/json',
      'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
    }
    const body = {
      "postID": item._id,
      "isFavourite": !item.isFavourite

    }
    const result = await apiCall.apiPOSTCall(AppConstants.AsyncKeyLiterals.postFavourite, body, headers);
    console.log("result.data", result);

    
    const newArray = data;
    newArray.map((i) => {
      if (item._id === i._id) {

        i.isFavourite = !i.isFavourite
      }
    })

    setData([...newArray]);



  }
  const onSelectType = (item) => {

    const newArray = data;
    newArray.map((i) => {
      if (item._id === i._id) {

        i.isShow = !i.isShow
      }
    })

    console.log(newArray);
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
        backgroundColor: item.isShow ? color.golden : color.white,
        padding: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
      }}>
        <Image source={{ uri: item.icon }} style={styles.iconStyle} />
      </View>
      <Text style={styles.bannerText}>{item.typeName}</Text>
    </TouchableOpacity>
  );
  // render list
  const renderItem = ({ item, index }) => {
    console.log(item);
    const formattedImages = item.images.map((image) => ({
      uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + image.name
    }));
    console.log(formattedImages);
    return (
      <View style={{ backgroundColor: color.black }}>
        {/* Header of post */}
        <View style={{
          marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
          marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Image source={{ uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + item.profileImage }} style={styles.profileStyle} />
          <Text style={[styles.textStyle, { flex: 1, fontSize: 14 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Regular, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{item.firstName} {item.lastName}</Text>

          <TouchableOpacity activeOpacity={0.6} onPress={() => setIsOpen(true)}>
            <Entypo name={'dots-three-vertical'} color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} />
          </TouchableOpacity>
        </View>

        {/* Body od post */}
        <View>
          <SliderBox
            images={formattedImages}
            dotColor={color.black}
            inactiveDotColor={color.gray}
            paginationBoxVerticalPadding={20}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10
            }}
            dotStyle={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              backgroundColor: "rgba(128, 128, 128, 0.92)"
            }}
            ImageComponentStyle={styles.imageStyle}
            imageLoadingColor={color.white}
          />
          <TouchableOpacity style={styles.heartPositionStyle} onPress={() => onSelectFavourite(item, index)}>
            <Animatable.View
              animation={'bounceIn'}
            >
              <FontAwesome
                name={'heart'}
                size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())}
                color={item.isFavourite ? color.golden : color.white}
              />
            </Animatable.View>
          </TouchableOpacity>
        </View>

        {/* description */}
        <View style={{
          width: '100%',
          paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
          paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
          bottom: 0,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.textStyle]}>{'Job Name - '}</Text>
            <Text style={[styles.textStyle]}>{item.title}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.textStyle]}>{'Job Description - '}</Text>
            <Text style={[styles.textStyle, { fontSize: 12 / PixelRatio.getFontScale() }]}>{item.additionalNote}</Text>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: color.black }}>


      {/* Header */}
      <Header screenName={'Home'} title={"Dashboard"} onNavigate={(item) => onNavigateScreen(item)} onPress={() => props.navigation.openDrawer()} />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Searchbar */}
        <Searchbar
          style={styles.searchbarStyle}
          value={searchText}
          inputStyle={styles.textStyle}
          textAlignVertical='top'
          onChangeText={(i) => setSearchText(i)}
          placeholder='search job'
        />
        {/* banner */}
        <Animatable.View animation={"fadeInUpBig"}>
          <FlatList
            data={bannerData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem1}
            contentContainerStyle={{ marginBottom: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), }}
            style={{ height: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()) }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />

          {/* List Data */}

          <FlatList
            ref={flatListRef}
            data={data}
            renderItem={renderItem}
          />
        </Animatable.View>
        <CustomBottomSheet onClose={() => setIsOpen(false)} isOpen={isOpen} />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

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
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
  },
  textStyle: {
    fontSize: 12 / PixelRatio.getFontScale(),
    color: color.white,
    fontFamily: FontFamily.Roboto_Light
  },
  bannerItem: {
    width: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()), // Set the width of each banner item
    backgroundColor: color.white,
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    borderTopLeftRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    borderTopRightRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    alignItems: 'center',

  },
  bannerText: {
    color: color.black,
    fontSize: 12 / PixelRatio.getFontScale(),
    paddingTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    fontFamily: FontFamily.Roboto_Medium
  },
  searchbarStyle: {
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    height: 40,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    backgroundColor: color.white
  }
})