import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, PixelRatio } from 'react-native';
import { Appbar } from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../Utils/Color';
import FontFamily from '../Utils/FontFamily';
import AppConstants from '../Storage/AppConstants';
import AntDesign from 'react-native-vector-icons/AntDesign'
const Header = ({ screenName, onPress, onNavigate, title, profileImage }) => {
    const renderHomeHeader = () => (
        <Appbar.Header style={[styles.headerContainer, {
        }]}>
                <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
                    <Octicons name='three-bars' color={color.black} size={20} />
                </TouchableOpacity>
        </Appbar.Header>
    );

    const renderNormalHeader = () => (
        <Appbar.Header style={[styles.headerContainer, styles.normalHeader]}>
            <TouchableOpacity style={{marginRight:PixelRatio.getPixelSizeForLayoutSize(10/PixelRatio.get())}} activeOpacity={0.6} onPress={onPress}>
                <AntDesign name='left' size={25 / PixelRatio.getFontScale()} color={color.black} />
            </TouchableOpacity>
            <Appbar.Content titleStyle={styles.textStyles} color={color.white} title={title} />
        </Appbar.Header>
    );

    return (
        <View>
            {screenName === "Home" && renderHomeHeader()}
            {screenName === "normal" && renderNormalHeader()}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: color.background,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    },
    profileStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
        width: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
        resizeMode: "contain"
    },
    userInfoContainer: {
        flex: 1,
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationButton: {
        marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    },
    textStyles: {
        color: color.black,
        fontSize: 16 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Medium,
    },
    normalHeader: {
        height: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()),
        alignItems: 'center',
    },
});

export default Header;
