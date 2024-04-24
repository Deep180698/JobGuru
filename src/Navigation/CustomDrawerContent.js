import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, PixelRatio } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../Utils/Color';
import AppConstants from '../Storage/AppConstants';
import cacheData from '../Storage/cacheData';
import CustomAlert from '../Component/CustomAlert';
import FontFamily from '../Utils/FontFamily';
import CustomButton from '../Component/CustomButton';

function CustomDrawerContent() {
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const { authData } = useSelector((state) => state.reducer);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    profileImage: '',
  });

  useEffect(() => {
    getProfileData();
    console.log(authData);
  }, []);

  const getProfileData = async () => {
    setUserDetails({
      ...userDetails,
      firstName: authData?.data?.userData?.firstName,
      lastName: authData?.data?.userData?.lastName,
      profileImage: authData?.data?.userData?.profileImage,
    });
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  const doLogout = () => {
    setAlertVisible(false);
    navigation.dispatch(DrawerActions.closeDrawer());
    cacheData.removeAllDataFromCache();
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthScreen' }],
      });
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* Drawer Item */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.profileContainer}>
            <Image
              resizeMode='contain'
              source={{ uri: `${AppConstants.AsyncKeyLiterals.Base_URL}/${userDetails.profileImage}` }}
              style={styles.profileStyle}
            />
            <Text style={[styles.textStyle, styles.profileName]}>{`${userDetails.firstName} ${userDetails.lastName}`}</Text>
            <Text style={[styles.textStyle, styles.profileText]}>View Profile</Text>
          </View>
          <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <AntDesign name='close' size={25 / PixelRatio.getFontScale()} color={color.black} />
          </TouchableOpacity>
        </View>
        {/* Menu Items */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('HomeScreen')}>
          <Entypo name='home' size={25 / PixelRatio.getFontScale()} color={color.gray} />
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FavouriteScreen')}>
          <MaterialCommunityIcons name='bookmark' size={25 / PixelRatio.getFontScale()} color={color.gray} />
          <Text style={styles.menuText}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
          <MaterialCommunityIcons name='account' size={25 / PixelRatio.getFontScale()} color={color.gray} />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FaqScreen')}>
          <MaterialCommunityIcons name='message-question' size={25 / PixelRatio.getFontScale()} color={color.gray} />
          <Text style={styles.menuText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ReportScreen')}>
          <MaterialIcons name='report' size={25 / PixelRatio.getFontScale()} color={color.gray} />
          <Text style={styles.menuText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SettingScreen')}>
          <Fontisto name='player-settings' size={25 / PixelRatio.getFontScale()} color={color.gray} />
          <Text style={styles.menuText}>Settings and Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => setAlertVisible(true)}>
          <MaterialCommunityIcons name='logout' size={25 / PixelRatio.getFontScale()} color={color.red} />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {/* Login btn */}
      <CustomButton
        onPress={()=>{}}
        text="Go Premium"
        backgroundColor={color.primerycolor}
        textColor={color.white}
      />
      <CustomAlert visible={alertVisible} message='Do you want to logout?' onSucess={doLogout} onClose={closeAlert} alert='logout' />
    </View>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
  },
  profileContainer: {
    flex: 1,
    marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
    alignItems: 'center',
  },
  profileStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(120 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(120 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()),
    resizeMode: 'contain',
  },
  profileName: {
    fontSize: 25 / PixelRatio.getFontScale(),
    fontFamily: FontFamily.Roboto_Bold,
    marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    color: color.black,

  },
  profileText: {
    fontSize: 16 / PixelRatio.getFontScale(),
    color: color.primerycolor,
    fontFamily: FontFamily.Roboto_Regular,
    marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
  },

  menuText: {
    marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    fontSize: 14 / PixelRatio.getFontScale(),
    color: color.black,
    fontFamily: FontFamily.Roboto_Regular,
  },
});
