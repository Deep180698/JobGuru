import { PixelRatio, StyleSheet, FlatList, View, RefreshControl} from 'react-native'
import React, { useState } from 'react'
import color from '../../Utils/Color'
import FontFamily from '../../Utils/FontFamily'
import SwipeableItem from '../../Component/SwipeableItem'

const ChatScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState([
    {

      "Name": 'Vaibhav verma',
      "Decription": "please send money on this account.please send money on this account.please send money on this account",
      "Time": "80 min ago",
      "profilePic": "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"

    },
    {

      "Name": 'kriti parker',
      "Decription": "please send money on this account",
      "Time": "80 min ago",
      "profilePic": "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"

    },
    {

      "Name": 'jenny kapoor',
      "Decription": "please send money on this account",
      "Time": "80 min ago",
      "profilePic": "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg"

    },
  ])

  renderItem = ({ item }) => {
    return (
      <SwipeableItem

        item={item}
        onSwipeLeft={() => handleSwipeLeft(item.id)}
        onSwipeRight={() =>handleSwipeRight(item.id)}
        onClick={() => {
         
        }}
      />
    )
  };
  return (
    <View style={styles.container}>
      
      <FlatList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => {
              setRefreshing(false);
            }, 2000);
          }}
        />
      } 
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bgWhite
  },
  textStyle: {
    fontSize: 12 / PixelRatio.getFontScale(),
    color: color.white,
    fontFamily: FontFamily.Roboto_Light
  },
})