import { StyleSheet, Text, View, FlatList, PixelRatio } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'
import JSONList from '../../JSON/JSONList'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontFamily from '../../Utils/FontFamily'
import { ExpandableSection } from 'react-native-ui-lib';

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
    setData([...newArray]);

  }
  const renderItem = ({ item, index }) => {

    return (

      <View style={{ marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
        <ExpandableSection
          expanded={item.isSHow}
          sectionHeader={
            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <Text style={[styles.textStyle, { flex: 1, marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), fontSize: 16 / PixelRatio.getFontScale() ,fontFamily:FontFamily.Roboto_Medium}]}>{item.question}</Text>
              <AntDesign name={item.isSHow ? 'down' : 'right'} size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} color={color.black} />
            </View>}
          onPress={() => onSelect(item, index)}
        >

          <View style={{
            alignItems: 'center',
            marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
          }}>
            <Text style={[styles.textStyle, { flex: 1, marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), fontSize: 14 / PixelRatio.getFontScale() }]}>{item.answer}</Text>

          </View>
        </ExpandableSection>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title={"FAQ"} screenName={"normal"} onPress={() => props.navigation.goBack()} />
      {/* body */}


      <FlatList
        data={data}
        style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}
        renderItem={renderItem}
      />
    </View>
  )
}

export default FaqScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white
  },
  textStyle: {
    fontSize: 14 / PixelRatio.getFontScale(),
    color: color.black,
    fontFamily: FontFamily.Roboto_Light

  }
})