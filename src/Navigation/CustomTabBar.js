// CustomTabBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import color from '../Utils/Color';
import FontFamily from '../Utils/FontFamily';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const currentRouteName = state.routes[state.index].name;

    if (currentRouteName === 'ImageSelection') {
        return null; // Hide the custom tab bar for PostScreen
    }
    if (currentRouteName === 'UserProfile') {
        return null; // Hide the custom tab bar for PostScreen
    }

    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {


                        navigation.navigate(route.name);
                    }
                };
                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        onPress={onPress}
                        style={[styles.tab, {}]}
                    >
                        {console.log(options.tabBarIcon)}
                        {options.tabBarIcon == 'home' ?
                            <View style={{ alignItems: 'center' }}>
                                <Ionicons name={isFocused ? "home" : 'home-outline'} size={isFocused ? 25 / PixelRatio.getFontScale() : 20 / PixelRatio.getFontScale()} color={color.white} />
                                {/* <Text style={[styles.textStyle]}>
                                    {'Home'}
                                </Text> */}
                            </View>
                            : null}
                        {options.tabBarIcon == 'Chat' ?
                            <View style={{ alignItems: 'center' }}>
                                <Ionicons name={isFocused ? "chatbox" : 'chatbox-outline'} size={isFocused ? 25 / PixelRatio.getFontScale() : 20 / PixelRatio.getFontScale()} color={color.white} />
                                {/* <Text style={[styles.textStyle]}>
                                    {'Chat'}
                                </Text> */}
                            </View>
                            : null}

                        {options.tabBarIcon == 'Plus' ?
                            <View style={{ alignItems: 'center' }}>
                                <AntDesign name={isFocused ? "plussquare" : 'plussquareo'} size={isFocused ? 25 / PixelRatio.getFontScale() : 20 / PixelRatio.getFontScale()} color={color.white} />
                                {/* <Text style={[styles.textStyle]}>
                                    {'Post'}
                                </Text> */}
                            </View>
                            : null}
                        {options.tabBarIcon == 'user' ?
                            <View style={{ alignItems: 'center' }}>
                                <FontAwesome name={isFocused ? "user" : 'user-o'} size={isFocused ? 25 / PixelRatio.getFontScale() : 20 / PixelRatio.getFontScale()} color={color.white} />
                                {/* <Text style={[styles.textStyle]}>
                                    {'Profile'}
                                </Text> */}
                            </View>

                            : null}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor:color.black,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 14 / PixelRatio.getFontScale(),
        color: color.white,
        fontFamily: FontFamily.Roboto_Regular,
        marginTop: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),

    }
});

export default CustomTabBar;
