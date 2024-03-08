import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, RefreshControl, Text, Image, TouchableOpacity, PixelRatio, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Header from '../../Component/Header';
import apiCall from '../../Utils/apiCall';
import AppConstants from '../../Storage/AppConstants';
import cacheData from '../../Storage/cacheData';
import axios from 'axios';
import color from '../../Utils/Color';
import FontFamily from '../../Utils/FontFamily';
import ImageCarousel from '../../Component/ImageCarousel';
import CustomLoader from '../../Component/CustomLoader';
import NoRecordFound from '../../Component/NoRecordFound';
import CustomNormalRBottomSheet from '../../Component/CustomNormalRBottomSheet';

const { width, height } = Dimensions.get('window');

const HomeScreen = (props) => {
  const flatListRef = useRef(null);
  const bottomSheetRef = useRef();
  const bottomSheetRef1 = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { authData } = useSelector((state) => state.reducer);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    profileImage: '',
  });
  const getProfileData = async () => {
    setUserDetails({
      ...userDetails,
      firstName: authData.data.userData.firstName,
      lastName: authData.data.userData.lastName,
      profileImage: authData.data.userData.profileImage,
    });
  };

  useEffect(() => {
    getProfileData();
    getBannerData();
    getPostData();
  }, [isOpen]);

  const getBannerData = async () => {
    const result = await apiCall.apiGETCall(AppConstants.AsyncKeyLiterals.getField);
    setBannerData(result);
  };

  const getPostData = async () => {
    const headers = {
      'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
    };
    const result = await apiCall.apiGETCall(AppConstants.AsyncKeyLiterals.getPost, headers);
    setRefreshing(false);
    setData(result);
  };

  const onSelectFavourite = async (item, index) => {
    const headers = {
      'Content-Type': 'application/json',
      'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
    };
    const data1 = await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.IS_AUTH);
    const body = {
      "postID": item._id,
      "UserID": data1.data._id,
      "isFavourite": !item.isFavourite
    };
    await axios({
      method: 'POST',
      url: AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.postFavourite,
      data: body,
      headers: headers
    }).then(response => {
      const newArray = data.map((i) => {
        if (item._id === i._id) {
          return {
            ...i,
            isFavourite: !i.isFavourite
          };
        }
        return i;
      });
      setData(newArray);
    });
  };

  const onSelectType = (item) => {
    const newArray = data.map((i) => {
      if (item._id === i._id) {
        return {
          ...i,
          isShow: !i.isShow
        };
      }
      return i;
    });
    setData(newArray);
  };

  const onNavigateScreen = (item) => {
    switch (item) {
      case 'post':
        props.navigation.navigate('PostScreen');
        break;
      default:
        break;
    }
  };

  // Banner item
  const renderItem1 = ({ item }) => (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onSelectType(item)} style={[styles.bannerItem, { width: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()) }]}>
      <View style={styles.bannerItemContainer}>
        <Image source={{ uri: item.icon }} style={styles.iconStyle} />
      </View>
      <Text style={styles.bannerText}>{item.typeName}</Text>
    </TouchableOpacity>
  );

  // Render list
  const renderItem = ({ item }) => {
    const formattedImages = item?.images.map((image) => ({
      uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + image?.name
    }));

    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.imageContainer}>
            <ImageCarousel style={styles.containerImageStyle} images={formattedImages} />
          </View>
          <TouchableOpacity style={styles.favoriteButton} onPress={() => onSelectFavourite(item)}>
            <Animatable.View animation={item.isFavourite ? 'bounceIn' : null}>
              <Ionicons
                name={item.isFavourite ? 'heart' : 'heart-outline'}
                size={20}
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
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.bgWhite }}>
      <CustomLoader isVisible={false} />
      <View>
        <Header screenName={'Home'} profileImage={userDetails.profileImage} title={`${userDetails.firstName} ${userDetails.lastName}`} onNavigate={onNavigateScreen} onPress={() => props.navigation.openDrawer()} />
        <View style={styles.searchbarContainer}>
          <Searchbar
            style={styles.searchbarStyle}
            value={searchText}
            inputStyle={styles.textStyle}
            onChangeText={(i) => setSearchText(i)}
            placeholder='Search job'
          />
        </View>
      </View>
      <ScrollView style={{ backgroundColor: color.bgWhite }} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            getPostData();
          }}
        />
      } showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <FlatList
            data={bannerData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem1}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            ref={flatListRef}
            data={data}
            numColumns={2}
            renderItem={renderItem}
            ListEmptyComponent={() => {
              return (
                <NoRecordFound title={"No Post Found"} />
              );
            }}
          />
        </View>
      </ScrollView>
      <CustomNormalRBottomSheet Height={100} data={(i) => { console.log(i) }} onClose={() => closeBottomSheet()} getCall={'myPostContainer'} refBottomSheet={bottomSheetRef} />
      <CustomNormalRBottomSheet Height={100} onClose={() => closeBottomSheet1()} getCall={'otherPostContainer'} refBottomSheet={bottomSheetRef1} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: color.bgWhite,
    marginTop: PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get()),
  },
  bannerItem: {
    backgroundColor: color.white,
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    borderTopLeftRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    borderTopRightRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: PixelRatio.getPixelSizeForLayoutSize(2 / PixelRatio.get()),
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
  },
  bannerItemContainer: {
    backgroundColor: color.white,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
  },
  bannerText: {
    color: color.black,
    fontSize: 12 / PixelRatio.getFontScale(),
    paddingTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    fontFamily: FontFamily.Roboto_Medium
  },

  searchbarContainer: {
    flexDirection: 'row',  // Ensure the search icon and text are aligned horizontally
    alignItems: 'center',  // Align items in the center vertically
    justifyContent: 'center', // Align items in the center horizontally
    backgroundColor: color.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    bottom: PixelRatio.getPixelSizeForLayoutSize(0 / PixelRatio.get()),
    marginBottom:PixelRatio.getPixelSizeForLayoutSize(-30 / PixelRatio.get()),
    zIndex: 2
  },
  searchbarStyle: {
    flex: 1,  // Ensure the Searchbar takes up all available space
    borderRadius: 20,
    backgroundColor: color.white,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerImageStyle: {
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
    resizeMode: 'stretch',
    width: width / 2 - PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    height: height * 0.3,
  },
  container: {
    width: width / 2 - PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    margin: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get())
  },
  cardContainer: {
    backgroundColor: color.white,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
  },
  imageContainer: {
    backgroundColor: color.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
  },
  favoriteButton: {
    position: 'absolute',
    backgroundColor: color.transparent,
    right: PixelRatio.getPixelSizeForLayoutSize(0 / PixelRatio.get()),
    shadowColor: '#000',
    shadowOffset: { width: PixelRatio.getPixelSizeForLayoutSize(0 / PixelRatio.get()), height: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()) },
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
  profileStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
    resizeMode: "contain"
  },
  iconStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    resizeMode: "cover",
  },
  textStyle: {
    fontSize: 12 / PixelRatio.getFontScale(),
    color: color.black,
    fontFamily: FontFamily.Roboto_Light,
  },
});
