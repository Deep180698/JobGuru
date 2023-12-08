import { StyleSheet, Text, View, TextInput, PixelRatio, TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import color from '../Utils/Color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
const CustomTextInput = ({ placeholder, type, value, leftIcon, RightIcon, onVisible, onChangeText, isVisible }) => {
    const [data, setData] = useState('')
    useEffect(() => {
     setData(value)
    }, [])
    
    return (
        <View>
            {type === 'normal' ?
                <View style={styles.TextInputStyle}>
                    <TextInput
                        value={data}
                        onChangeText={(i) => [setData(i), onChangeText(i)]}
                        style={{ flex: 1 }}
                        placeholder={placeholder}
                    />

                </View>
                : null}
            {type === 'Address' ?
                <View style={styles.TextInputStyle}>
                    <TextInput
                        value={data}
                        onChangeText={(i) => [setData(i), onChangeText(i)]}
                        maxLength={2000}
                        style={{ flex: 1 ,height:80,textAlignVertical:'top'}}
                        multiline={true}
                        placeholder={placeholder}
                    />

                </View>
                : null}

            {type === 'MobileNumber' ?
                <View style={styles.TextInputStyle}>
                    <Entypo name='mobile' size={25} color={color.black} />

                    <TextInput
                        value={data}
                        onChangeText={(i) => [setData(i), onChangeText(i)]}
                        style={{ flex: 1 }}
                        keyboardType='number-pad'
                        placeholder={placeholder}
                    />

                </View>
                : null}
            {type === 'Email' ?
                <View style={styles.TextInputStyle}>
                    <MaterialIcons name='email' size={25} color={color.black} />
                    <TextInput
                        value={data}
                        onChangeText={(i) => [setData(i), onChangeText(i)]}
                        style={{ flex: 1 }}
                        placeholder={placeholder}
                    />

                </View>
                : null}
            {type === 'Password' ?
                <View style={styles.TextInputStyle}>
                    <MaterialIcons name='lock' size={25} color={color.black} />
                    <TextInput
                        value={data}
                        onChangeText={(i) => [setData(i), onChangeText(i)]}
                        secureTextEntry={isVisible}
                        style={{ flex: 1 }}
                        placeholder={placeholder}
                    />

                    <TouchableOpacity onPress={onVisible}>
                        <FontAwesome name={isVisible ? 'eye-slash' : 'eye'} size={25} color={color.black} />
                    </TouchableOpacity>
                </View>
                : null}
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    TextInputStyle: {
        backgroundColor: color.golden,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    }
})