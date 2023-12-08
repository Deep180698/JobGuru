import { PixelRatio, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import color from '../Utils/Color'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontFamily from '../Utils/FontFamily'

const Header = ({ screenName, onPress, onNavigate, title }) => {
    return (

        <View style={styles.container}>
            {/* Home */}
            {screenName === "Home" ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
                        <Octicons name='three-bars' color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get())} />
                    </TouchableOpacity>
                    <Text style={[styles.textStyles, { flex: 1, color: color.white, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Dashboard"}</Text>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>onNavigate('post')}>
                        <AntDesign name={"plussquare"} size={24} color={ color.white} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={{marginLeft:PixelRatio.getPixelSizeForLayoutSize(10/PixelRatio.get())}} onPress={()=>onNavigate('notifications')}>
                        <Ionicons name='notifications' color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get())} />
                    </TouchableOpacity>
                </View>
                : null
            }

            {/* SignUp */}
            {screenName === "SignUp" ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
                        <Ionicons name='arrow-back' color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get())} />
                    </TouchableOpacity>
                    <Text style={[styles.textStyles, { color: color.white, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{title}</Text>
                </View>
                : null
            }
            {/* FAQ */}
            {screenName === "FAQ" ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
                        <Ionicons name='arrow-back' color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get())} />
                    </TouchableOpacity>
                    <Text style={[styles.textStyles, { color: color.white, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"FAQ"}</Text>
                </View>
                : null
            }
            {/* FAQ */}
            {screenName === "Profile" ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
                        <AntDesign name='close' color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} />
                    </TouchableOpacity>
                </View>
                : null
            }
            {/* Report */}
            {screenName === "Report" ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
                        <Ionicons name='arrow-back' color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get())} />
                    </TouchableOpacity>
                    <Text style={[styles.textStyles, { color: color.white, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Report"}</Text>
                </View>
                : null
            }
            {/* EditProfile */}
            {screenName === "EditProfile" ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
                        <Ionicons name='arrow-back' color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get())} />
                    </TouchableOpacity>
                    <Text style={[styles.textStyles, { color: color.white, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Edit Profile"}</Text>
                </View>
                : null
            }
            {/* FavouriteScreen*/}
            {screenName === "Favourite" ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
                        <Ionicons name='arrow-back' color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get())} />
                    </TouchableOpacity>
                    <Text style={[styles.textStyles, { color: color.white, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Favourite"}</Text>
                </View>
                : null
            }
            {/* SettingScreen*/}
            {screenName === "SettingScreen" ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
                        <Ionicons name='arrow-back' color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get())} />
                    </TouchableOpacity>
                    <Text style={[styles.textStyles, { color: color.white, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Settings and Privacy"}</Text>
                </View>
                : null
            }
            {screenName === "PostScreen" ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
                        <Ionicons name='arrow-back' color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get())} />
                    </TouchableOpacity>
                    <Text style={[styles.textStyles, { color: color.white, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Post"}</Text>
                </View>
                : null
            }
        </View>
    )
}

export default Header

const styles = StyleSheet.create({

    container: {
        height: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()),
        backgroundColor: color.black,
        justifyContent: 'center',
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btnStyles: {
        backgroundColor: color.white,
        padding: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
    },
    textStyles: {
        color: color.black,
        fontSize: 20 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Regular

    }
})