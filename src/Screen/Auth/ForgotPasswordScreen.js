import { View, Text, StyleSheet, PixelRatio, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
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
            <ImageBackground source={require('../../assets/BackGround.png')} style={{ width: "100%", height: "100%" }}>
                <Image source={require('../../assets/logo.png')} style={styles.logoStyle} />

                <Animatable.Text animation={"zoomIn"} style={[styles.textStyles, {
                    color: color.white,
                    fontSize: 25 / PixelRatio.getFontScale(),
                    fontFamily: FontFamily.Roboto_BoldItalic,
                    textAlign: 'center', padding: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
                }]}>{"Forgot Password"}</Animatable.Text>

                <Animatable.View animation={"zoomIn"} style={{
                    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),

                    backgroundColor: color.white,
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
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

                        <CustomTextInput
                            onChangeText={(i) => setEmail(i)}
                            type={"whiteBc"}
                            placeholder={"Email"}
                        />

                        {/* Login btn */}
                        <CustomButton press={validatefunc} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }} text="Submit" />

                    </View>

                </Animatable.View>

            </ImageBackground>
            <CustomAlert isSucess={isSucess} visible={alertVisible} message={message} onClose={closeAlert} alert={"login"} />

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
        backgroundColor: color.white,
        padding: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
    },
    textStyles: {
        color: color.black,
        fontSize: 16 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Light
    }
})


export default ForgotPasswordScreen