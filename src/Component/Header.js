import { PixelRatio, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import color from '../Utils/Color'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontFamily from '../Utils/FontFamily'
import { Appbar } from 'react-native-paper'
const Header = ({ screenName, onPress, onNavigate, title }) => {
    return (

        <View>
            {/* Home */}
            {screenName === "Home" ?

                <Appbar.Header style={{ backgroundColor: color.black, alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.6} style={{ marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }} onPress={onPress}>
                        <Octicons name='three-bars' color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} />
                    </TouchableOpacity>
                    <Appbar.Content titleStyle={[styles.textStyles, { color: color.white }]} title={title} />
                    <TouchableOpacity activeOpacity={0.6} style={{ marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }} onPress={() => onNavigate('notifications')}>
                        <Ionicons name='notifications' color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} />
                    </TouchableOpacity>
                </Appbar.Header>

                : null
            }

            {/* SignUp */}
            {screenName === "normal" ?

                <Appbar.Header style={{
                    backgroundColor: color.black,
                    height: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()),
                    alignItems: 'center'
                }}>
                    <Appbar.BackAction color={color.white} onPress={onPress} />
                    <Appbar.Content titleStyle={styles.textStyles} color={color.white} title={title} />

                </Appbar.Header>

                : null
            }

        </View>
    )
}

export default Header

const styles = StyleSheet.create({


    btnStyles: {
        backgroundColor: color.white,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
    },
    textStyles: {
        color: color.white,
        fontSize: 16 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Regular

    }
})