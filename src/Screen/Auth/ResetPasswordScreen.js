import { View, Text, ScrollView, TextInput, StyleSheet, PixelRatio, Image, TouchableOpacity, ImageBackground, Dimensions, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
const { height, width } = Dimensions.get('window');
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from '../../Component/CustomButton';
import CustomAlert from '../../Component/CustomAlert';
import * as Animatable from 'react-native-animatable';
import { Checkbox } from 'react-native-paper';
import FontFamily from '../../Utils/FontFamily';
import apiCall from '../../Utils/apiCall';
import CustomTextInput from '../../Component/CustomTextInput';
import Header from '../../Component/Header';

const ResetPasswordScreen = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lasttName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [province, setProvince] = useState('')
    const [country, setCountry] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [mobileNumber, setmobileNumber] = useState(0)
    const [isVisible, setIsVisible] = useState(true)
    const [isVisible1, setIsVisible1] = useState(true)
    const [alertVisible, setAlertVisible] = useState(false)
    const [isSucess, setIsSucess] = useState(false)
    const [checkTermCon, setCheckTermCon] = useState(false)

    useEffect(() => {

    }, [])


    const showAlert = () => {
        setAlertVisible(true);
    };

    const closeAlert = () => {
        if (isSucess) {
            props.navigation.navigate('LoginScreen')
            setAlertVisible(false)
        } else {
            setAlertVisible(false);

        }
    };
    const validatefunc = () => {

        if (!firstName) {
            setMessage('Enter first name');
            showAlert()
            return;
        }
        else if (!lasttName) {
            setMessage('Enter last name');
            showAlert()
            return;
        }
        else if (!email || !email.includes('@')) {
            setMessage('Invalid email address');
            showAlert()
            return;
        }

        else if (!password || password.length < 8) {
            setMessage('Password must be at least 8 characters long');
            showAlert()
            return;
        }

        else if (!confirmPassword) {
            setMessage('Enter confirm password');
            showAlert()
            return;
        }


        else if (confirmPassword !== password) {
            setMessage('Password and confirm password must be same!!');
            showAlert()
            return;
        }
        else if (!checkTermCon) {
            setMessage('Please check terms and condition!!');
            showAlert()
            return;
        }
        else {

            fetchData()
        }

    };

    const fetchData = async () => {
        try {

            const data = {
                "firstName": firstName,
                "lastName": lasttName,
                "mobileNumber": parseInt(mobileNumber),
                "email": email,
                "password": password,
                "checked": checkTermCon
            }

            const Header = {
                'Content-Type': 'application/json',
            }
            const result = await apiCall.apiPOSTCall('signUp', data, Header);

            console.log(result);

            setMessage(result.message);

            setIsSucess(true)
            showAlert()
        } catch (error) {
        } finally {
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <Header screenName={"normal"} onPress={() => props.navigation.goBack()} />


                    <Animatable.Image duration={3000} animation={'fadeIn'} source={require('../../assets/logo_text.png')} style={styles.logoStyle} />

                    <Animatable.Text duration={3000} animation={'fadeIn'} style={[styles.textStyles, {
                        fontSize: 30 / PixelRatio.getFontScale(),
                        fontFamily: FontFamily.Roboto_Bold,
                        marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),

                    }]}>{'Reset Password 👍'}</Animatable.Text>

                    <Animatable.Text duration={3000} animation={'fadeIn'} style={[styles.textStyles, {
                        fontSize: 14 / PixelRatio.getFontScale(),
                        fontFamily: FontFamily.Roboto_Light,
                        color: color.gray,
                        marginTop: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),

                    }]}>{'Let’s change a password. And apply to jobs!'}</Animatable.Text>
                    <View style={{
                        marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),

                    }}>

                        <View style={{
                            marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
                            marginTop: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),

                        }}>



                            <CustomTextInput
                                onChangeText={(i) => setPassword(i)}
                                isVisible={isVisible}
                                onVisible={() => setIsVisible(!isVisible)}
                                type={"whiteBc"}
                                placeholder={"Password"}
                            />
                            <CustomTextInput
                                onChangeText={(i) => setconfirmPassword(i)}
                                isVisible={isVisible}
                                onVisible={() => setIsVisible(!isVisible)}
                                type={"whiteBc"}
                                placeholder={"Confirm Password"}
                            />
                            {/* Login btn */}
                            <CustomButton
                                onPress={validatefunc}
                                text="Reset Password"
                                backgroundColor={color.primerycolor}
                                textColor={color.white}
                            />
                        </View>

                    </View>
                    <CustomAlert isSucess={isSucess} visible={alertVisible} message={message} onClose={closeAlert} alert={"login"} />
                </ScrollView>
            </KeyboardAvoidingView>
        </View >

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())

    },
    logoStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()),
        width: PixelRatio.getPixelSizeForLayoutSize(150 / PixelRatio.get()),
        resizeMode: 'contain',
        marginTop: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()),
    },
    btnStyles: {
        backgroundColor: color.golden,
        padding: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
    },
    textStyles: {
        color: color.black,
        fontSize: 14 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Regular
    },
})


export default ResetPasswordScreen