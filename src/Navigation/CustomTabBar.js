// CustomTabBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import color from '../Utils/Color';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const currentRouteName = state.routes[state.index].name;

    if (currentRouteName === 'ImageSelection') {
        return null; // Hide the custom tab bar for PostScreen
    }
    if (currentRouteName === 'Profile') {
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
                            <Ionicons name={isFocused ? "home" : 'home-outline'} size={isFocused ? 25 / PixelRatio.getFontScale() : 20 / PixelRatio.getFontScale()} color={color.white} />
                            : null}
                        {options.tabBarIcon == 'Chat' ?
                            <Ionicons name={isFocused ? "chatbox" : 'chatbox-outline'} size={isFocused ? 25 / PixelRatio.getFontScale() : 20 / PixelRatio.getFontScale()} color={color.white} />
                            : null}
                        {options.tabBarIcon == 'Plus' ?
                            <AntDesign name={isFocused ? "plussquare" : 'plussquareo'} size={isFocused ? 25 / PixelRatio.getFontScale() : 20 / PixelRatio.getFontScale()} color={color.white} />
                            : null}
                        {options.tabBarIcon == 'user' ?
                            <FontAwesome name={isFocused ? "user" : 'user-o'} size={isFocused ? 25 / PixelRatio.getFontScale() : 20 / PixelRatio.getFontScale()} color={color.white} />
                            : null}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: color.black,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
        marginTop: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    },
});

export default CustomTabBar;
