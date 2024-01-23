import { PixelRatio, StyleSheet, Dimensions, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native-paper'
import color from '../Utils/Color'
import FontFamily from '../Utils/FontFamily'
import { useSelector, useDispatch } from 'react-redux';
import { updateCountryCode, updatePhoneNumber } from '../Storage/Action'
import CustomRBottomSheet from './CustomRBottomSheet'
const { height, width } = Dimensions.get('screen')

const PhoneNumberInput = ({ countryCode, mobileNumber }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [country_Code, setcountry_Code] = useState()
    const [phone_Number, setPhone_Number] = useState()
    const { authData } = useSelector((state) => state.reducer);
    const dispatch = useDispatch();

    const bottomSheetRef = useRef();

    const openBottomSheet = () => {
        bottomSheetRef.current.open();
    };
    const closeBottomSheet = () => {
        bottomSheetRef.current.close();
    };
    useEffect(() => {
        setcountry_Code(authData?.data?.userData?.countryCode || '')
        setPhone_Number(authData?.data?.userData?.mobileNumber || '')
    }, [authData])


    return (
        <View style={{ flexDirection: 'row', flex: 1 }}>

            <TextInput
                mode='outlined'
                value={country_Code}
                textColor={color.black}
                onFocus={() => { openBottomSheet() }}
                outlineStyle={{ borderColor: color.black }}
                style={[styles.TextInputStyle, { flex: 0.3, marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}
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
                onChangeText={(i) => [setPhone_Number(i),mobileNumber(i)]}
                cursorColor={color.black}
                label={'Number'}
                keyboardType='number-pad'

            />
            <CustomRBottomSheet Height={height} getCall={'countryPicker'} refBottomSheet={bottomSheetRef} data={(i) => { setcountry_Code(i), countryCode(i),closeBottomSheet() }}/>
        </View>
    )
}

export default PhoneNumberInput

const styles = StyleSheet.create({
    TextInputStyle: {
       flex:1,
        backgroundColor: color.white,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        flexDirection: 'row',
        fontSize: 12 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Regular
    }
})