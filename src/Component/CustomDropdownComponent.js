import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, PixelRatio } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from '../Utils/Color';


const DropdownComponent = ({data,selectedValue,placeholder}) => {
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.value}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="value"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
        selectedValue(item.value)
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    width:'100%',
    height: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()),
    backgroundColor: color.background,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    borderColor: color.gray,
    borderWidth: 1,
    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
  },
  icon: {
    marginRight: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
  },
  item: {
    padding: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 14 / PixelRatio.getFontScale(),
    color: color.black
  },
  placeholderStyle: {
    fontSize: 14 / PixelRatio.getFontScale(),
    color: color.black
  },
  selectedTextStyle: {
    fontSize: 14 / PixelRatio.getFontScale(),
    color: color.black
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14 / PixelRatio.getFontScale(),
  },
});
