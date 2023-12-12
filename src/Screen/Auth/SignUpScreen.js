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
import FontFamily from '../../Utils/FontFamily';
import apiCall from '../../Utils/apiCall';
import CustomTextInput from '../../Component/CustomTextInput';
import CustomBottomSheet from '../../Component/CustomBottomSheet';
import PhoneInput from 'react-native-phone-number-input';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../../Component/Header';
const SignUpScreen = (props) => {
    const [countryImage, setCountryImage] = useState('https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg')
    const [firstName, setFirstName] = useState('Deep')
    const [lasttName, setLastName] = useState('Patel')

    const [email, setEmail] = useState('pateldeep0989@gmail.com')
    const [password, setPassword] = useState('Deep0909@')
    const [confirmPassword, setconfirmPassword] = useState('Deep0909@')
    const [message, setMessage] = useState('')
    const [isVisible, setIsVisible] = useState(true)
    const [isVisible1, setIsVisible1] = useState(true)
    const [alertVisible, setAlertVisible] = useState(false)
    const [isSucess, setIsSucess] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formattedValue, setFormattedValue] = useState('');


    const handleOnEndEditing = () => {
    };


    useEffect(() => {

    }, [])


    const showAlert = () => {
        setAlertVisible(true);
    };

    const closeAlert = () => {
        if (isSucess) {
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

        else {

            fetchData()
        }

    };


    const fetchData = async () => {
        try {

            const data = {

                "email": email,

            }

            const Header = {
                'Content-Type': 'application/json',
            }
            const result = await apiCall.apiPOSTCall('/check_user', data, Header);

            console.log(result);

            if (!result.exists) {
                props.navigation.navigate("UserDetails", {
                    "firstName": firstName,
                    "lastName": lasttName,
                    "email": email,
                    "password": password,
                })

            } else {
                setMessage(result.message);
                setIsSucess(true)
                showAlert()
            }


        } catch (error) {
        } finally {
        }
    };



    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <Image source={require('../../assets/logo.png')} style={styles.logoStyle} />

                    <View style={{ alignSelf: 'center' }}  >
                        <Text style={[styles.textStyles, { color: color.white, fontSize: 25 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Italic }]}>{"Create Yout Profile"}</Text>
                    </View>
                    <Animatable.View animation={"zoomIn"} duration={1000} style={{
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
                                value={firstName}
                                onChangeText={(i) => setFirstName(i)}
                                type={"whiteBc"}
                                placeholder={"First Name"}
                            />
                            <CustomTextInput
                                value={lasttName}
                                onChangeText={(i) => setLastName(i)}
                                type={"whiteBc"}
                                placeholder={"Last Name"}
                            />

                            <CustomTextInput
                                value={email}
                                onChangeText={(i) => setEmail(i)}
                                type={"whiteBc"}
                                placeholder={"Email"}
                            />

                            <CustomTextInput
                                value={password}
                                onChangeText={(i) => setPassword(i)}
                                isVisible={isVisible}
                                onVisible={() => setIsVisible(!isVisible)}
                                type={"whiteBc"}
                                placeholder={"Password"}
                            />
                            <CustomTextInput
                                value={confirmPassword}
                                onChangeText={(i) => setconfirmPassword(i)}
                                isVisible={isVisible}
                                onVisible={() => setIsVisible(!isVisible)}
                                type={"whiteBc"}
                                placeholder={"Confirm Password"}
                            />
                          
                            {/* Next btn */}
                            <CustomButton press={validatefunc} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }} text="Next" />
                        </View>

                    </Animatable.View>
                </View>
                <CustomAlert isSucess={isSucess} visible={alertVisible} message={message} onClose={closeAlert} alert={"login"} />
            </ScrollView>

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
    },
    imageStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(120 / PixelRatio.get()),
        width: PixelRatio.getPixelSizeForLayoutSize(120 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: color.white
    },

})


export default SignUpScreen