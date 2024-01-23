import { View, StyleSheet, PixelRatio, Dimensions } from 'react-native'
import React from 'react'
import color from '../../Utils/Color'
import CustomButton from '../../Component/CustomButton'
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window')
const AuthScreen = (props) => {


    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()) }}>
                    <Animatable.Image duration={3000} animation={'fadeIn'}  resizeMode='contain'
                        source={require('../../assets/logo.png')}
                        style={styles.logoStyle} />
                </View>
                <View style={{
                    justifyContent: 'center',
                    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
                    marginBottom: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
                }}>
                    <CustomButton text={"Sign in"} press={() => props.navigation.navigate('LoginScreen')} style={{ backgroundColor: color.black, borderWidth: 1, borderColor: color.white }} textStyle={{ color: color.white }} />
                    <CustomButton text={"Sign Up"} press={() => props.navigation.navigate('SignUpScreen')} style={{ backgroundColor: color.black, borderWidth: 1, borderColor: color.white, marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }} textStyle={{ color: color.white }} />

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.black,

    },
    logoStyle: {
        alignSelf: 'center',
        height: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()),
        width: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()),

    },


})



export default AuthScreen