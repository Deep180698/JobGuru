import { View, Text, StyleSheet, PixelRatio, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
import CustomButton from '../../Component/CustomButton';
import CustomAlert from '../../Component/CustomAlert';
import { authFunc } from '../../Storage/Action'
import { useDispatch } from 'react-redux'
import AppConstants from '../../Storage/AppConstants';
import cacheData from '../../Storage/cacheData'
import * as Animatable from 'react-native-animatable';
import FontFamily from '../../Utils/FontFamily';
import { ScrollView } from 'react-native';
import CustomTextInput from '../../Component/CustomTextInput';
import axios from 'axios';
import CustomLoader from '../../Component/CustomLoader';


const LoginScreen = (props) => {
    const { width, height } = Dimensions.get('window');

    const [email, setEmail] = useState('pateldeep0989@gmail.com')
    const [password, setPassword] = useState('Deep0909@')
    const [isVisible, setIsVisible] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [isSucess, setIsSucess] = useState(false)
    const [message, setMessage] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {

    }, [])

    const fetchData = async () => {

        setIsVisible(true)
        
        const headers = {
            "Content-type": "application/json"
        }
        const data = {
            'email': email,
            'password': password
        }

        console.log(AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.getLogin);
        await axios({
            method: 'POST',
            url: AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.getLogin,
            data: data,
            headers: headers
        }).then(response => {
            if (response.status === 200) {

                dispatch(authFunc(response.data))

                const asyncItem = AppConstants.AsyncKeyLiterals;
                cacheData.saveDataToCachedWithKey(asyncItem.isLoggedIn, true);
                cacheData.saveDataToCachedWithKey(asyncItem.IS_AUTH, response.data);
                cacheData.token(asyncItem.token, response.data.token);
                setIsVisible(false)

                props.navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: "BottomNavigator",
                        },
                    ],
                });
            }

        }).catch(error => {
            if (error.response.status === 401) {
                setMessage(error.response.data.error)
                setAlertVisible(true)
                setIsVisible(false)

            } else {
                setMessage(error.message)
                setAlertVisible(true)
                setIsVisible(false)

            }
        }).finally(()=>{
            setIsVisible(false)

        })
    };

    const showAlert = () => {
        setAlertVisible(true);
    };

    const closeAlert = () => {
        setAlertVisible(false);
    };

    const validatefunc = () => {
        if (!email || !email.includes('@')) {
            setMessage('Invalid email address');
            showAlert()
            return;
        }
        else if (!password || password.length < 8) {
            setMessage('Password must be at least 8 characters long');
            showAlert()
            return;
        }
        else {
            fetchData();
        }
    };


    return (
        <View style={styles.container}>
            <CustomLoader isVisible={isVisible}/>
            <ImageBackground source={require('../../assets/BackGround.png')} style={{ width: width, height: height }}>

                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <Animatable.Image duration={3000} animation={'fadeIn'} source={require('../../assets/logo.png')} style={styles.logoStyle} />

                    <Animatable.Text duration={3000} animation={'fadeIn'} style={[styles.textStyles, {
                        color: color.white,
                        fontSize: 25 / PixelRatio.getFontScale(),
                        fontFamily: FontFamily.Roboto_BoldItalic,
                        textAlign: 'center', padding: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
                    }]}>Welcome</Animatable.Text>

                    <View style={{ flex: 1 }}>
                        <View style={{

                            marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
                            backgroundColor: color.white,
                            marginTop: PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get()),
                            paddingBottom: PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get()),
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
                                marginTop: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get())
                            }}>

                                {/* Email Style*/}
                                <CustomTextInput
                                    value={email}
                                    onChangeText={(i) => setEmail(i)}
                                    isVisible={isVisible}
                                    onVisible={() => setIsVisible(!isVisible)}
                                    type={"whiteBc"}
                                    placeholder={"Email"}
                                />

                                {/* Password Style */}
                                <CustomTextInput
                                    value={password}
                                    onChangeText={(i) => setPassword(i)}
                                    isVisible={isVisible}
                                    onVisible={() => setIsVisible(!isVisible)}
                                    type={"whiteBc"}
                                    placeholder={"Password"}
                                />


                                {/* Login btn */}
                                <CustomButton press={validatefunc} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }} text="Login" />
                                <TouchableOpacity activeOpacity={0.6} onPress={() => props.navigation.navigate('ResetPasswordScreen')} style={{ alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                                    <Text style={styles.textStyles}>{"Forgot your password ?"}</Text>
                                </TouchableOpacity>


                            </View>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()) }}>
                        <Text style={styles.textStyles}>{"Don't you have account? "}</Text>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => props.navigation.navigate('SignUpScreen')}>
                            <Text style={[styles.textStyles, { color: color.golden, fontFamily: FontFamily.Roboto_Bold, fontSize: 12 / PixelRatio.getFontScale() }]}>{"Register Here"}</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomAlert isSucess={isSucess} visible={alertVisible} message={message} onClose={closeAlert} alert={"normal"} />
                </ScrollView>
            </ImageBackground>
        </View>
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
        fontSize: 12 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Light
    }
})


export default LoginScreen