import { View, Text, StyleSheet, PixelRatio, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
const { height, width } = Dimensions.get('window');
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '../../Component/CustomButton';
import CustomAlert from '../../Component/CustomAlert';
import { authFunc } from '../../Storage/Action'
import AppConstants from '../../Storage/AppConstants';
import cacheData from '../../Storage/cacheData'
import { useDispatch } from 'react-redux'
import * as Animatable from 'react-native-animatable';
import FontFamily from '../../Utils/FontFamily';
import apiCall from '../../Utils/apiCall';
import CustomTextInput from '../../Component/CustomTextInput';
import Header from '../../Component/Header';


const ForgotPasswordScreen = (props) => {
    const [email, setEmail] = useState('pateldeep0989@gmail.com')
    const [alertVisible, setAlertVisible] = useState(false)
    const [isSucess, setIsSucess] = useState(false)
    const [message, setMessage] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {

    }, [])

    const fetchData = async () => {
        try {

            const data = {
                'email': email,
            }
            const Header = {
                'Content-Type': 'application/json',
            }
            const result = await apiCall.apiPOSTCall('login', data, Header);
            setIsSucess(true)
            showAlert()
        } catch (error) {
        } finally {
        }
    };

    const showAlert = () => {
        setAlertVisible(true);
    };

    const closeAlert = () => {
        if (isSucess) {
            props.navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "LoginScreen",
                    },
                ],
            });

            setAlertVisible(false)
        } else {
            setAlertVisible(false);

        }
    };

    const validatefunc = () => {
        if (!email || !email.includes('@')) {
            setMessage('Invalid email address');
            showAlert()
            return;
        }

        else {
            // fetchData();
            props.navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "LoginScreen",
                    },
                ],
            });
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <Header screenName={"normal"} onPress={() => props.navigation.goBack()} />


                <Animatable.Image duration={3000} animation={'fadeIn'} source={require('../../assets/logo_text.png')} style={styles.logoStyle} />

                <Animatable.Text duration={3000} animation={'fadeIn'} style={[styles.textStyles, {
                    fontSize: 30 / PixelRatio.getFontScale(),
                    fontFamily: FontFamily.Roboto_Bold,
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),

                }]}>{'Forgot Password 👍'}</Animatable.Text>

                <Animatable.Text duration={3000} animation={'fadeIn'} style={[styles.textStyles, {
                    fontSize: 14 / PixelRatio.getFontScale(),
                    fontFamily: FontFamily.Roboto_Light,
                    color: color.gray,
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),

                }]}>{'Let’s change a password. And apply to jobs!'}</Animatable.Text>
                <View animation={"zoomIn"} style={{
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),


                }}>

                    <View style={{

                        marginTop: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get())
                    }}>

                        <CustomTextInput
                            onChangeText={(i) => setEmail(i)}
                            type={"whiteBc"}
                            placeholder={"Email"}
                        />

                        {/* Login btn */}
                        <CustomButton
                                onPress={validatefunc}
                                text="Submit"
                                backgroundColor={color.primerycolor}
                                textColor={color.white}
                            />

                    </View>

                </View>
            </ScrollView>
            <CustomAlert isSucess={isSucess} visible={alertVisible} message={message} onClose={closeAlert} alert={"login"} />

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
    },
})


export default ForgotPasswordScreen