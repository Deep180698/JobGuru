import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'

const SettingScreen = (props) => {
  return (
    <View style={styles.container}>
      <Header title={"Setting"} screenName={"normal"} onPress={() => props.navigation.goBack()} />
      <Text>SettingScreen</Text>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:color.black
    }
})