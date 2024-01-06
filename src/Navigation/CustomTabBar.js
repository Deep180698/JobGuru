// CustomTabBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
                            <Entypo name={"home"} size={24} color={isFocused ? color.golden : color.white} />
                            : null}
                        {options.tabBarIcon == 'Chat' ?
                            <MaterialIcons name={"chat-bubble"} size={24} color={isFocused ? color.golden : color.white} />
                            : null}

                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        height: 50,
        elevation: 8,

    },
    tab: {
        flex: 1,
        backgroundColor: color.black,
        borderTopWidth: 0.2,
        borderColor: color.white,
        justifyContent: 'center',
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
});

export default CustomTabBar;
