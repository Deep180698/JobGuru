// CustomBottomSheet.js
import BottomSheet from 'react-native-raw-bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, PixelRatio, PermissionsAndroid, Platform, Dimensions, FlatList } from 'react-native';
import color from '../Utils/Color';
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker from 'react-native-image-crop-picker';
import FontFamily from '../Utils/FontFamily';

const { height, width } = Dimensions.get('screen');


const CustomNormalRBottomSheet = ({ refBottomSheet, onClose, getCall, data, multiple }) => {

  useEffect(() => {
    requestPermissions();
  }, []);


  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const cameraPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      return cameraPermission === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // On iOS, permission is handled at build time in the Info.plist
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const storagePermission = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      return (
        storagePermission['android.permission.READ_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        storagePermission['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true; // On iOS, permission is handled at build time in the Info.plist
  };

  const requestPermissions = async () => {
    const cameraPermissionGranted = await requestCameraPermission();
    const storagePermissionGranted = await requestStoragePermission();

    if (!cameraPermissionGranted || !storagePermissionGranted) {
      // Handle the case when permissions are not granted
    }
  };

  const openPicker = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
        multiple: multiple
      });
      data(result)
      onClose()

    } catch (error) {
      console.error('Error picking image:', error);

    }
  };
  const openCamaraPicker = async () => {
    try {
      const result = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });

      // Handle the selected image
      data(result)
      onClose()
    } catch (error) {
      console.error('Error picking image:', error);

    }
  };
  const onPress = async (key) => {
    switch (key) {
      case 'Report':
        data('Report')
        onClose()
        break;
      case 'Delete':
        data('Delete')
        onClose()
        break;
      case 'Hide':
        data('Hide')
        onClose()
        break;
      default:
        break;
    }
  };
  return (
    <BottomSheet
      ref={refBottomSheet}
      closeOnDragDown={true}
      duration={2000}
      height={120}
      // Conditionally set the height based on getCall
      customStyles={{
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,

        },
        // Conditionally set the height based on getCall

      }}

    >

      {getCall == "imageSelection" ?
        <View>
          <TouchableOpacity activeOpacity={0.6} onPress={() => openCamaraPicker()} style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Entypo name='camera' color={color.black} style={{ flex: 1, textAlign: 'center' }} size={20 / PixelRatio.getFontScale()} />
            <Text style={[styles.textStyle, { flex: 4, fontFamily: FontFamily.Roboto_black }]}>{"Upload from camara"}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={() => openPicker()} style={{ alignItems: 'center', flexDirection: 'row', marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
            <Entypo name='folder-images' color={color.black} style={{ flex: 1, textAlign: 'center' }} size={20 / PixelRatio.getFontScale()} />
            <Text style={[styles.textStyle, { flex: 4, fontFamily: FontFamily.Roboto_black }]}>{"Upload from Gallery"}</Text>
          </TouchableOpacity>
        </View>

        : null}
      {getCall == "myPostContainer" ?


        <View style={{}}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => onPress('Hide')} style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Entypo name='eye-with-line' color={color.red} style={{ flex: 1, textAlign: 'center' }} size={20 / PixelRatio.getFontScale()} />
            <Text style={[styles.textStyle, { flex: 4, color: color.red, fontFamily: FontFamily.Roboto_black }]}>{"Hide Post"}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={() => onPress('Report')} style={{ alignItems: 'center', flexDirection: 'row', marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
            <Octicons name='report' color={color.red} style={{ flex: 1, textAlign: 'center' }} size={20 / PixelRatio.getFontScale()} />
            <Text style={[styles.textStyle, { flex: 4, color: color.red, fontFamily: FontFamily.Roboto_black }]}>{"Report Post"}</Text>
          </TouchableOpacity>
        </View> : null}
      {getCall == "otherPostContainer" ?

        <View style={{}}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => onPress('Hide')} style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Entypo name='eye-with-line' color={color.red} style={{ flex: 1, textAlign: 'center' }} size={20 / PixelRatio.getFontScale()} />
            <Text style={[styles.textStyle, { flex: 4, color: color.red, fontFamily: FontFamily.Roboto_black }]}>{"Hide Post"}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={() => onPress('Delete')} style={{ alignItems: 'center', flexDirection: 'row', marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
            <MaterialCommunityIcons name='delete' color={color.red} style={{ flex: 1, textAlign: 'center' }} size={20 / PixelRatio.getFontScale()} />
            <Text style={[styles.textStyle, { flex: 4, color: color.red, fontFamily: FontFamily.Roboto_black }]}>{"Delete Post"}</Text>
          </TouchableOpacity>
        </View> : null
      }
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    paddingBottom: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    borderTopLeftRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    borderTopRightRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    width: '100%',
  },

  textStyle: {
    fontSize: 14 / PixelRatio.getFontScale(),
    color: color.black,
    fontFamily: FontFamily.Roboto_Light
  },
  btnStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
  },
  searchbarStyle: {
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    height: 40,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    backgroundColor: color.gray
  }
});
export default CustomNormalRBottomSheet;
