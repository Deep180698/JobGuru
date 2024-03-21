import { View, Text, ScrollView, StyleSheet, PixelRatio, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
const { height, width } = Dimensions.get('window');
import CustomButton from '../../Component/CustomButton';
import CustomAlert from '../../Component/CustomAlert';
import FontFamily from '../../Utils/FontFamily';
import CustomTextInput from '../../Component/CustomTextInput';
import AppConstants from '../../Storage/AppConstants';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../../Component/Header';
const SignUpScreen = (props) => {
    const [firstName, setFirstName] = useState('Deep')
    const [lasttName, setLastName] = useState('Patel')
    const [email, setEmail] = useState('pateldeep0989@gmail.com')
    const [password, setPassword] = useState('Deep0909@')
    const [confirmPassword, setconfirmPassword] = useState('Deep0909@')
    const [message, setMessage] = useState('')
    const [isVisible, setIsVisible] = useState(true)
    const [alertVisible, setAlertVisible] = useState(false)
    const [isSucess, setIsSucess] = useState(false)


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

        const data = {
            "email": email,
        }
        const headers = {
            'Content-Type': 'application/json',
        }
        await axios({
            method: 'POST',
            url: AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.check_user,
            data: data,
            headers: headers
        }).then(response => {
            if (response.status === 200) {

                props.navigation.navigate("UserDetails", {
                    "firstName": firstName,
                    "lastName": lasttName,
                    "email": email,
                    "password": password,
                })
            }

        }).catch(error => {
            if (error.response.status === 401) {
                setMessage(error.response.data.error)
                setAlertVisible(true)
            } else {
                setMessage(error.message)
                setAlertVisible(true)
            }
        });
    };


    const InputBlock = () => {
        return (
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
                <CustomButton
                    onPress={validatefunc}
                    text="Next"
                    backgroundColor={color.primerycolor}
                    textColor={color.white}
                />

            </View>
        )
    }

    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <Header screenName={"normal"} onPress={() => props.navigation.goBack()} />
                <Animatable.Image duration={3000} animation={'fadeIn'} source={require('../../assets/logo_text.png')} style={styles.logoStyle} />
                <Animatable.Text duration={3000} animation={'fadeIn'} style={[styles.textStyles, {
                    fontSize: 30 / PixelRatio.getFontScale(),
                    fontFamily: FontFamily.Roboto_Bold,
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),

                }]}>{'Registration 👍'}</Animatable.Text>

                <Animatable.Text duration={3000} animation={'fadeIn'} style={[styles.textStyles, {
                    fontSize: 14 / PixelRatio.getFontScale(),
                    fontFamily: FontFamily.Roboto_Light,
                    color: color.gray,
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),

                }]}>{'Let’s Register. Apply to jobs!'}</Animatable.Text>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),

                        }}>

                        {InputBlock()}

                    </View>
                    <Text style={[styles.textStyles, { textAlign: 'center', fontSize: 14 / PixelRatio.getFontScale(), color: color.gray, marginVertical: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()) }]}>{" ------------------------------ Or continue with ------------------------------"}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                        <AntDesign name="google" size={30 / PixelRatio.getFontScale()} color={color.black} />
                        <AntDesign name="facebook-square" size={30 / PixelRatio.getFontScale()} style={{ marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()) }} color={color.primerycolor} />
                        <AntDesign name="apple1" size={28 / PixelRatio.getFontScale()} color={color.black} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()), marginBottom: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()) }}>
                        <Text style={[styles.textStyles, { color: color.gray }]}>{"Haven’t an account? "}</Text>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => props.navigation.navigate('SignUpScreen')}>
                            <Text style={[styles.textStyles, { color: color.primerycolor, fontFamily: FontFamily.Roboto_Bold, fontSize: 12 / PixelRatio.getFontScale() }]}>{"Register"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <CustomAlert isSucess={isSucess} visible={alertVisible} message={message} onClose={closeAlert} alert={"normal"} />
            </ScrollView>
        </View >

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
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