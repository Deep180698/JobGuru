import { Image, PixelRatio, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from '../Utils/Color'
import FontFamily from '../Utils/FontFamily'

const NoRecordFound = ({title,Description}) => {
    return (
        <View style={{
            flex: 1, alignItems: 'center',
             marginTop: PixelRatio.getPixelSizeForLayoutSize(150 / PixelRatio.get()),
        }}>
            <Image style={styles.profileStyle} source={require('../assets/NoData.png')} />
            <Text style={styles.textStyle}>{title}</Text>
        </View>
    )
}

export default NoRecordFound

const styles = StyleSheet.create({
    profileStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(150 / PixelRatio.get()),
        width: PixelRatio.getPixelSizeForLayoutSize(150 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        resizeMode: "contain"
    },
    textStyle: {
        fontSize: 16 / PixelRatio.getFontScale(),
        color: color.black,
        fontFamily: FontFamily.Roboto_black
    },
})