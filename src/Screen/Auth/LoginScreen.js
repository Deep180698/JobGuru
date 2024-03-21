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
import AntDesign from 'react-native-vector-icons/AntDesign'


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
        }).finally(() => {
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
            <CustomLoader isVisible={isVisible} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                <AntDesign name='left' size={25 / PixelRatio.getFontScale()} color={color.black} />


                <Animatable.Image duration={3000} animation={'fadeIn'} source={require('../../assets/logo_text.png')} style={styles.logoStyle} />

                <Animatable.Text duration={3000} animation={'fadeIn'} style={[styles.textStyles, {
                    fontSize: 30 / PixelRatio.getFontScale(),
                    fontFamily: FontFamily.Roboto_Bold,
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),

                }]}>{'Welcome Back 👋'}</Animatable.Text>

                <Animatable.Text duration={3000} animation={'fadeIn'} style={[styles.textStyles, {
                    fontSize: 14 / PixelRatio.getFontScale(),
                    fontFamily: FontFamily.Roboto_Light,
                    color: color.gray,
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),

                }]}>{'Let’s log in. Apply to jobs!'}</Animatable.Text>
                <View style={{ flex: 1 }}>
                    <View style={{

                        marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),

                    }}>

                        <View style={{
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
                            <CustomButton
                                onPress={validatefunc}
                                text="Login"
                                backgroundColor={color.primerycolor}
                                textColor={color.white}
                            />
                            <TouchableOpacity activeOpacity={0.6} onPress={() => props.navigation.navigate('ForgotPasswordScreen')} style={{ alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                                <Text style={[styles.textStyles, { color: color.primerycolor }]}>{"Forgot your password ?"}</Text>
                            </TouchableOpacity>


                        </View>

                    </View>
                    <Text style={[styles.textStyles, { textAlign: 'center', fontSize: 14 / PixelRatio.getFontScale(), color: color.gray, marginVertical: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()) }]}>{" -------------------- Or continue with --------------------"}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                        <AntDesign name="google" size={30 / PixelRatio.getFontScale()} color={color.black} />
                        <AntDesign name="facebook-square" size={30 / PixelRatio.getFontScale()} style={{ marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()) }} color={color.primerycolor} />
                        <AntDesign name="apple1" size={28 / PixelRatio.getFontScale()} color={color.black} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()) }}>
                    <Text style={[styles.textStyles, { color: color.gray }]}>{"Haven’t an account? "}</Text>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => props.navigation.navigate('SignUpScreen')}>
                        <Text style={[styles.textStyles, { color: color.primerycolor, fontFamily: FontFamily.Roboto_Bold, fontSize: 12 / PixelRatio.getFontScale() }]}>{"Register"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <CustomAlert isSucess={isSucess} visible={alertVisible} message={message} onClose={closeAlert} alert={"normal"} />
        </View>
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
    }
})


export default LoginScreen