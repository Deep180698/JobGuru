// CustomBottomSheet.js
import BottomSheet from 'react-native-raw-bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, PixelRatio, PermissionsAndroid, Platform, Dimensions, FlatList } from 'react-native';
import color from '../Utils/Color';
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import ImagePicker from 'react-native-image-crop-picker';
import FontFamily from '../Utils/FontFamily';
import Header from './Header';
import { Searchbar } from 'react-native-paper';
const { height, width } = Dimensions.get('window');
import AppConstants from '../Storage/AppConstants'
import { updateCountryCode } from '../Storage/Action'
import { useDispatch } from 'react-redux'
import apiCall from '../Utils/apiCall';
import CustomAutoComplate from './CustomAutoComplate';

const CustomRBottomSheet = ({ refBottomSheet, getCall, data }) => {
  const [countryList, setCountryList] = useState();
  const [filterData, setFilterData] = useState();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getCountryData()
  }, []);

  const getCountryData = async () => {
    apiCall.apiGETCall(AppConstants.AsyncKeyLiterals.getCountry, {}).then((response) => {
      setCountryList(response)
      setFilterData(response)

    })
  }


  const onSelect = (countryCode) => {

    data(countryCode)
    setSearchText('')
    setCountryList(filterData)
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
    <BottomSheet
      ref={refBottomSheet}
      closeOnDragDown={true}
      duration={2000}
      height={height}
      // Conditionally set the height based on getCall
      customStyles={{
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,

        },
        // Conditionally set the height based on getCall

      }}

    >

      {getCall == "countryPicker" ?

        <View style={[{ flex: 1 }]}>
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
            style={{ backgroundColor: color.white }}
          />
        </View>
        : null}

      {getCall == "AddSkills" ?
        <View style={{flex:1}}>
          <CustomAutoComplate
            press={(texts) => data(texts)}
            title={"Add skills"} />
        </View>
        : null}

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
    backgroundColor:'#eeeeee'
  }
});
export default CustomRBottomSheet;
