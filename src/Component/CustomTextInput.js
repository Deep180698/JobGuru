import { StyleSheet, Text, View, PixelRatio, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import color from '../Utils/Color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { TextInput } from 'react-native-paper'
import FontFamily from '../Utils/FontFamily'
const { height, width } = Dimensions.get('screen')
const CustomTextInput = ({ style, placeholder, type, value, leftIcon, RightIcon, onVisible, onChangeText, isVisible, onPress }) => {
    useEffect(() => {
    }, [])

    return (
        <View>
            {type === 'firstName' ?
                <TextInput
                    mode='outlined'
                    value={value}
                    contentStyle={{width:width}}
                    textColor={color.black}
                    outlineStyle={{ borderColor: color.black }}
                    placeholderTextColor={color.white}
                    textAlignVertical='top'
                    textContentType='streetAddressLine1'
                    style={[styles.TextInputStyle, { textAlignVertical: 'top' }]}
                    onChangeText={(i) => [onChangeText(i)]}
                    label={placeholder}
                />
                : null}

            {type === 'normal' ?
                <TextInput

                    mode='outlined'
                    value={value}
                    textColor={color.white}
                    outlineStyle={{ borderColor: color.white }}
                    style={styles.TextInputStyle}
                    onChangeText={(i) => [onChangeText(i)]}
                    label={placeholder}
                    contentStyle={{width:width}}

                />
                : null}

            {type === 'Address' ?
                <TextInput
                    mode='outlined'
                    value={value}
                    textColor={color.black}
                    outlineStyle={{ borderColor: color.black }}
                    multiline={true}
                    style={[styles.TextInputStyle, { height: 80, textAlignVertical: 'top' }]}
                    onChangeText={(i) => [onChangeText(i)]}
                    label={placeholder}
                    contentStyle={{width:width}}
                />
                : null}

            {type === 'whiteBc' ?
                <TextInput
                    mode='outlined'
                    value={value}
                    textColor={color.black}
                    outlineStyle={{ borderColor: color.black }}
                    style={[styles.TextInputStyle]}
                    onChangeText={(i) => onChangeText(i)}
                    cursorColor={color.black}
                    label={placeholder}
                    contentStyle={[{width:width},style]}
                />
                : null}

        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    TextInputStyle: {
        backgroundColor: color.white,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        flexDirection: 'row',
        fontSize: 12 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Regular
    }
})