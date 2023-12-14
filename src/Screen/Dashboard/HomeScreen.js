import { StyleSheet, FlatList, View, Text, Image, PixelRatio, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Header from '../../Component/Header'
import JSONList from '../../JSON/JSONList'
import AntDesign from "react-native-vector-icons/AntDesign";
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
    setData(JSONList.DashboardList)
  }, [isOpen])


  const getBannerData = async () => {

    console.log("helloa work");
    // apiCall.apiGETCall(AppConstants.AsyncKeyLiterals.getField).then((res)=>{
    //   console.log("res",res);
    // })
    const result = await apiCall.apiGETCall(AppConstants.AsyncKeyLiterals.getField);
    console.log("result.data", result);

    setBannerData(result)

  }
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
          <Text style={[styles.textStyle, { flex: 1, fontSize: 14 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Regular, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{item.useData.Name}</Text>

          <TouchableOpacity activeOpacity={0.6} onPress={() => setIsOpen(true)}>
            <Entypo name={'dots-three-vertical'} color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} />
          </TouchableOpacity>
        </View>
        {/* Body od post */}
        <View>
          <Image source={{ uri: item.images }} style={styles.imageStyle} />

          <TouchableOpacity style={styles.heartPositionStyle} onPress={() => onSelectFavourite(item, index)}>
            <Animatable.View
              animation={'bounceIn'}
            >
              <FontAwesome
                name={'heart'}
                size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())}
                color={item.isFavourite ? color.white : color.white}
              />
            </Animatable.View>
          </TouchableOpacity>
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
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
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