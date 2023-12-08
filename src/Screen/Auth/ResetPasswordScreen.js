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
                <ImageBackground source={require('../../assets/BackGround.png')} style={{ width: width, height: height }}>

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <Image source={require('../../assets/logo.png')} style={styles.logoStyle} />

                        <Animatable.Text animation={"fadeIn"} duration={3000} style={[styles.textStyles, {
                            color: color.white,
                            fontSize: 25 / PixelRatio.getFontScale(),
                            fontFamily: FontFamily.Roboto_BoldItalic,
                            textAlign: 'center', padding: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
                        }]}>{"Rest Password"}</Animatable.Text>
                        <Animatable.View animation={"zoomIn"} duration={1000} style={{
                            marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
                            backgroundColor: color.white,
                            marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
                            paddingBottom: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
                            marginBottom: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>

                            <View style={{
                                marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
                                marginTop: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),

                            }}>



                                <CustomTextInput
                                    onChangeText={(i) => setPassword(i)}
                                    isVisible={isVisible}
                                    onVisible={() => setIsVisible(!isVisible)}
                                    type={"Password"}
                                    placeholder={"Password"}
                                />
                                <CustomTextInput
                                    onChangeText={(i) => setconfirmPassword(i)}
                                    isVisible={isVisible}
                                    onVisible={() => setIsVisible(!isVisible)}
                                    type={"Password"}
                                    placeholder={"Confirm Password"}
                                />
                                {/* Login btn */}
                                <CustomButton press={validatefunc} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }} text="Reset Password" />
                            </View>

                        </Animatable.View>
                        <CustomAlert isSucess={isSucess} visible={alertVisible} message={message} onClose={closeAlert} alert={"login"} />
                    </ScrollView>
                </ImageBackground>
            </KeyboardAvoidingView>
        </View >

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.black,
    },
    logoStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(150 / PixelRatio.get()),
        width: PixelRatio.getPixelSizeForLayoutSize(150 / PixelRatio.get())
    },
    btnStyles: {
        backgroundColor: color.golden,
        padding: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
    },
    textStyles: {
        color: color.black,
        fontSize: 16 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Light
    }
})


export default ResetPasswordScreen