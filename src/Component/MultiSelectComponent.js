import React, { useState } from 'react';
import { PixelRatio, StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from '../Utils/Color';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const MultiSelectComponent = () => {
  const [selected, setSelected] = useState([]);

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.selectedTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        search
        itemTextStyle={styles.selectedTextStyle}
        data={data}
        labelField="value"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={selected}
        onSearchTextChange={(text) => {
          // Add the searched item dynamically if it does not exist in the list
          if (text.trim() !== '' && !data.find(item => item.label.toLowerCase() === text.toLowerCase())) {
            const newItem = { label: text, value: text };
            setSelected(prevSelected => [...prevSelected, newItem]);
          }
        }}
        selectedStyle={styles.selectedTextStyle}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()),
    backgroundColor: color.background,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    borderColor: color.black,
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
