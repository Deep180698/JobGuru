// CustomTabBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../Utils/Color';

const CustomTabBar = ({ state, descriptors, navigation }) => {

    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {

                    console.log('Navigating to:', route.name);
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
                            <Ionicons name={isFocused ? "home" : 'home-outline'} size={isFocused ? 25 / PixelRatio.getFontScale() : 20 / PixelRatio.getFontScale()} color={color.black} />
                            : null}
                        {options.tabBarIcon == 'Chat' ?
                            <Ionicons name={isFocused ? "chatbox" : 'chatbox-outline'} size={isFocused ? 25 / PixelRatio.getFontScale() : 20 / PixelRatio.getFontScale()} color={color.black} />
                            : null}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: color.white,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        flexDirection: 'row',
        alignItems: 'center',
       
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    },
});

export default CustomTabBar;
