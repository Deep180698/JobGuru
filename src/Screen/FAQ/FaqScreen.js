import { StyleSheet, Text, View, FlatList, PixelRatio, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'
import JSONList from '../../JSON/JSONList'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import FontFamily from '../../Utils/FontFamily'
import { Card, Image, ListItem, Carousel, ExpandableSection, Switch } from 'react-native-ui-lib';

const FaqScreen = (props) => {

  const [data, setData] = useState([])

  useEffect(() => {

    setData(JSONList.FAQData.faq)
  }, [])

  const onSelect = (item, index) => {

    const newArray = data;
    newArray.map((i) => {
      if (item.id === i.id) {

        i.isSHow = !i.isSHow
      }
    })

    console.log(newArray);
    setData([...newArray]);

  }
  const renderItem = ({ item, index }) => {

    return (

      <View style={{marginVertical:PixelRatio.getPixelSizeForLayoutSize(10/PixelRatio.get())}}>
        <ExpandableSection
          expanded={item.isSHow}
          sectionHeader={
            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <Octicons name={'dot-fill'} size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} color={color.white} />
              <Text style={[styles.textStyle, { flex: 1, marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), fontSize: 16 / PixelRatio.getFontScale() }]}>{item.question}</Text>
              <AntDesign name={item.isSHow ? 'down' : 'right'} size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} color={color.white} />
            </View>}
          onPress={() => onSelect(item, index)}
        >

          <View style={{
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <Octicons name={'dot-fill'} size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} color={color.black} />
            <Text style={[styles.textStyle, { flex: 1, marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), fontSize: 14 / PixelRatio.getFontScale() }]}>{item.answer}</Text>
            <AntDesign name={item.isSHow ? 'down' : 'right'} size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} color={color.black} />

          </View>
        </ExpandableSection>



      </View>
    )
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header screenName={"FAQ"} onPress={() => props.navigation.goBack()} />
      {/* body */}


      <FlatList
        data={data}
        renderItem={renderItem}
      />
    </View>
  )
}

export default FaqScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.black
  },
  textStyle: {
    fontSize: 14 / PixelRatio.getFontScale(),
    color: color.white,
    fontFamily: FontFamily.Roboto_Light

  }
})