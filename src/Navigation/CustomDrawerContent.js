
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import color from '../Utils/Color';
import { Image } from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppConstants from '../Storage/AppConstants';
import cacheData from '../Storage/cacheData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../Component/CustomAlert';
import FontFamily from '../Utils/FontFamily';

function CustomDrawerContent() {
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false)
  const [isSucess, setIsSucess] = useState(false)
  const [message, setMessage] = useState('')
  const navigateToScreen = (screenName) => {
    console.log("1111");
    navigation.navigate(screenName);
  }


  const closeAlert = () => {


    setAlertVisible(false)

  };
  const doLogout = () => {
    setAlertVisible(false)
    navigation.dispatch(DrawerActions.closeDrawer())

    cacheData.removeAllDataFromCache();


    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "AuthScreen",
          },
        ],
      });
    }, 200);
  }
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: 'https://img.freepik.com/free-photo/smiling-young-female-construction-worker-wearing-safety-helmet-safety-vest-holding-pointing-mobile-phone_409827-206.jpg?size=626&ext=jpg&ga=GA1.1.1980125515.1699564547&semt=ais' }} style={styles.imageStyle} />
      </View>
      {/* Drawer Item */}
      <View style={{ flex: 1 }}>
        {/* Home */}
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigateToScreen("HomeScreen")} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
          <Entypo name='home' size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} color={color.white} />
          <Text style={[styles.textStyle, { flex: 1, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Dashboard"}</Text>
          <AntDesign name='right' size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} color={color.white} />
        </TouchableOpacity>
        {/* Favourite */}
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigateToScreen("FavouriteScreen")} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
          <MaterialIcons name='favorite' size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} color={color.white} />
          <Text style={[styles.textStyle, { flex: 1, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Favourite"}</Text>
          <AntDesign name='right' size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} color={color.white} />
        </TouchableOpacity>
        {/* Edit profile */}
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigateToScreen("Profile")} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
          <MaterialCommunityIcons name='account' size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} color={color.white} />
          <Text style={[styles.textStyle, { flex: 1, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Profile"}</Text>
          <AntDesign name='right' size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} color={color.white} />
        </TouchableOpacity>
        {/* FAQ */}
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigateToScreen("FaqScreen")} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
          <MaterialCommunityIcons name='message-question' size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} color={color.white} />
          <Text style={[styles.textStyle, { flex: 1, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"FAQ"}</Text>
          <AntDesign name='right' size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} color={color.white} />
        </TouchableOpacity>
        {/* report */}
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigateToScreen("ReportScreen")} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
          <MaterialIcons name='report' size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} color={color.white} />
          <Text style={[styles.textStyle, { flex: 1, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Report"}</Text>
          <AntDesign name='right' size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} color={color.white} />
        </TouchableOpacity>
        {/* Setting */}
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigateToScreen("SettingScreen")} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
          <Fontisto name='player-settings' size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} color={color.white} />
          <Text style={[styles.textStyle, { flex: 1, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Settings and Privacy"}</Text>
          <AntDesign name='right' size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} color={color.white} />
        </TouchableOpacity>
      </View>
      {/* Logout */}
      <TouchableOpacity activeOpacity={0.6} onPress={() => setAlertVisible(true)} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), marginBottom: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()), marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
        <MaterialCommunityIcons name='logout' size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} color={color.white} />
        <Text style={[styles.textStyle, { flex: 1, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Logout"}</Text>
      </TouchableOpacity>
      <CustomAlert visible={alertVisible} message={"Do you want to logut ?"} onSucess={doLogout} onClose={() => closeAlert()} alert={"logout"} />

    </View>
  );
}
export default CustomDrawerContent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.black
  },
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(150 / PixelRatio.get()),
  },
  profileStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()),
    resizeMode: "contain"
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
    fontFamily: FontFamily.Roboto_Light

  }
})