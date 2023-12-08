import { View, Text, StyleSheet, PixelRatio, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import color from '../../Utils/Color'
import { useSelector } from 'react-redux'
import FontFamily from '../../Utils/FontFamily'
import CustomButton from '../../Component/CustomButton'
import * as Animatable from 'react-native-animatable';

const AuthScreen = (props) => {


    return (
        <Animatable.View animation={"slideInRight"} duration={600} style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Animatable.Image animation={"bounceIn"} duration={3000} resizeMode='contain'
                    source={require('../../assets/logo.png')}
                    style={styles.logoStyle} />
            </View>
            <View style={{
                justifyContent: 'center',
                marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
                marginBottom: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
            }}>
                <CustomButton text={"Sign in"} press={() => props.navigation.navigate('LoginScreen')} style={{ backgroundColor: color.golden }} textStyle={{ color: color.black }} />
                <CustomButton text={"Sign Up"} press={() => props.navigation.navigate('SignUpScreen')} style={{ backgroundColor: color.white, marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }} textStyle={{ color: color.black }} />

            </View>
        </Animatable.View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.black,

    },
    logoStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()),
        width: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get())
    },


})



export default AuthScreen