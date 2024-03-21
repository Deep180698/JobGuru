import { View, StyleSheet, PixelRatio, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import color from '../../Utils/Color'
import CustomButton from '../../Component/CustomButton'
import * as Animatable from 'react-native-animatable';
import startImage from '../../assets/Start.jpg';
const { height, width } = Dimensions.get('window')
const AuthScreen = (props) => {


    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ImageBackground style={{ height: height, width: width }} source={startImage}>

                    <View style={{ flex: 1, justifyContent: 'space-between', marginTop: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()) }}>
                        <Animatable.Image duration={3000} animation={'fadeIn'} resizeMode='contain'
                            source={require('../../assets/logo4.png')}
                            style={styles.logoStyle} />

                        <View style={{
                            marginBottom: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
                            paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
                        }}>

                            <CustomButton
                                onPress={() => props.navigation.navigate('LoginScreen')}
                                text="Sign in"
                                backgroundColor={color.white}
                                textColor={color.black}
                            />

                            <CustomButton
                                onPress={() => props.navigation.navigate('SignUpScreen')}
                                text="Sign Up"
                                backgroundColor={color.white}
                                textColor={color.black}
                            />

                        </View>
                    </View>
                </ImageBackground>
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