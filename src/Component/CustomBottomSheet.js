import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, PixelRatio, PermissionsAndroid, Platform, Dimensions, FlatList } from 'react-native';
import color from '../Utils/Color';
import Entypo from 'react-native-vector-icons/Entypo'
import ImagePicker from 'react-native-image-crop-picker';
import FontFamily from '../Utils/FontFamily';
import Header from './Header';
import { Searchbar } from 'react-native-paper';
const { height, width } = Dimensions.get('screen');
import AppConstants from '../Storage/AppConstants'
import { updateCountryCode } from '../Storage/Action'
import { useDispatch } from 'react-redux'
import apiCall from '../Utils/apiCall';
const CustomBottomSheet = ({ isOpen, onClose, getCall, data,multiple }) => {
  const [countryList, setCountryList] = useState();
  const [filterData, setFilterData] = useState();
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getCountryData()
    requestPermissions();
  }, []);


  const getCountryData = async () => {

    const headers = {
    }

    apiCall.apiGETCall(AppConstants.AsyncKeyLiterals.getCountry, headers).then((response) => {

      setCountryList(response)
      setFilterData(response)

    })

  }


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
        multiple:multiple
      });
      data(result)


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

    } catch (error) {
      console.error('Error picking image:', error);

    }
  };

  const onSelect = (countryCode) => {

    data(countryCode)
    setSearchText('')
    setCountryList(filterData)
    onClose()

  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => onSelect(item.dial_code)} activeOpacity={0.6} style={{
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderBottomWidth: PixelRatio.getPixelSizeForLayoutSize(1 / PixelRatio.get()),
        borderColor: color.gray,
        flexDirection: 'row'
      }}>
        <Text style={[styles.textStyle, { flex: 0.2, marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{`( ${item.dial_code} )`}</Text>
        <Text style={[styles.textStyle, { flex: 0.8 }]}>{item.name}</Text>
      </TouchableOpacity >
    )
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={isOpen}
      >

        {getCall == "countryPicker" ?

          <View style={[{ flex: 1, backgroundColor: color.black, }]}>
            <Header onPress={onClose} screenName={'normal'} title={'Select Country'} />
            <Searchbar
              style={styles.searchbarStyle}
              value={searchText}
              inputStyle={styles.textStyle}
              textAlignVertical='top'
              onClearIconPress={() => { setCountryList(filterData) }}
              onChangeText={(i) => {
                setSearchText(i)
                const filtered = filterData.filter(
                  (item) =>
                    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.dial_code.includes(searchText) ||
                    item.code.toLowerCase().includes(searchText.toLowerCase())
                );
                setCountryList(filtered)
              }}
              placeholder='search Country'
            />
            <FlatList
              data={countryList}
              renderItem={renderItem}
              style={{backgroundColor:color.white}}
            />
          </View>
          : null}
        {getCall == "imageSelection" ?
          <View style={styles.modalContainer}>
            <View style={styles.bottomSheet}>
              {/* Content of your bottom sheet */}


              <View>
                <TouchableOpacity activeOpacity={0.6} onPress={() => openCamaraPicker()} style={styles.btnStyle}>
                  <Entypo name='camera' color={color.black} size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} />
                  <Text style={[styles.textStyle, { marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Upload from camara"}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={() => openPicker()} style={styles.btnStyle}>
                  <Entypo name='folder-images' color={color.black} size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} />
                  <Text style={[styles.textStyle, { marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Upload from Gallery"}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={onClose} style={[styles.btnStyle, { backgroundColor: color.black, marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>
                  <Text style={[styles.textStyle,{color:color.white}]}>{"Cancel"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          : null}
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
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
  closeButton: {
    color: 'blue',
    marginTop: 16,
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
    backgroundColor: color.white
  }
});

export default CustomBottomSheet;
