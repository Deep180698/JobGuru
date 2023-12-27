import { PixelRatio, StyleSheet, Dimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import color from '../Utils/Color'
import FontFamily from '../Utils/FontFamily'
import CustomBottomSheet from './CustomBottomSheet'
import { useSelector, useDispatch } from 'react-redux';
import { updateCountryCode, updatePhoneNumber } from '../Storage/Action'
const { height, width } = Dimensions.get('screen')

const PhoneNumberInput = ({ countryCode, mobileNumber }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [country_Code, setcountry_Code] = useState()
    const [phone_Number, setPhone_Number] = useState()
    const { authData } = useSelector((state) => state.reducer);
    const dispatch = useDispatch();


    useEffect(() => {
        setcountry_Code(authData.data.userData.countryCode || '')
        setPhone_Number(authData.data.userData.mobileNumber || '')
    }, [authData])

    const submitClose = () => {
        setIsOpen(false)
    }

    return (
        <View style={{ flexDirection: 'row', flex: 1 }}>

            <TextInput
                mode='outlined'
                value={country_Code}
                textColor={color.black}
                onFocus={() => { setIsOpen(true) }}
                outlineStyle={{ borderColor: color.black }}
                style={[styles.TextInputStyle, { flex:0.3,marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}
                onChangeText={(i) => [dispatch(updateCountryCode(i)), setcountry_Code(i)]}
                cursorColor={color.black}
                label={'Code'}
            />

            <TextInput
                mode='outlined'
                value={phone_Number}
                textColor={color.black}
                outlineStyle={{ borderColor: color.black, }}
                style={[styles.TextInputStyle]}
                onChangeText={(i) => [mobileNumber(i), setPhone_Number(i)]}
                cursorColor={color.black}
                label={'Mobile Number'}
            
            />

            <CustomBottomSheet isOpen={isOpen} data={(i) => { setcountry_Code(i), countryCode(i) }} onClose={submitClose} getCall={'countryPicker'} style={{}} />
        </View>
    )
}

export default PhoneNumberInput

const styles = StyleSheet.create({
    TextInputStyle: {
        flex: 1,
        backgroundColor: color.white,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        flexDirection: 'row',
        fontSize: 12 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Regular
    }
})