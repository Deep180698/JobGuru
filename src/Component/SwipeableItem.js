import React, { useRef } from 'react';
import {
    StyleSheet,
    PixelRatio,
    View,
    Animated,
    Text,
    Image,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import color from '../Utils/Color';
import FontFamily from '../Utils/FontFamily';


const SwipeableItem = (props) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const onLeftClick = () => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.5,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
        props.onSwipeLeft();
    };

    const onRightClick = () => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.5,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
        props.onSwipeRight();
    };

    const renderLeftActions = (progress, dragX) => {
        const animatedStyle = {
            transform: [{ scale: scaleValue }],
        };

        return (
            <TouchableOpacity
                onPress={() => {
                    onLeftClick();
                }}
                style={styles.leftAction}
            >
                <Animated.View style={animatedStyle}>
                    <MaterialIcons
                        name="archive"
                        size={30 / PixelRatio.getFontScale()}
                        color={color.black}
                    />
                </Animated.View>
            </TouchableOpacity>
        );
    };

    const renderRightActions = (progress, dragX) => {
        const animatedStyle = {
            transform: [{ scale: scaleValue }],
        };

        return (
            <TouchableOpacity
                onPress={() => {
                    onRightClick();
                }}
                style={styles.rightAction}
            >
                <Animated.View style={animatedStyle}>
                    <MaterialCommunityIcons
                        name="delete"
                        size={30 / PixelRatio.getFontScale()}
                        color={color.white}
                    />
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
        >
            <TouchableOpacity
                onPress={() => {
                    props.onClick();
                }}
                activeOpacity={1}
                style={{
                    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
                    backgroundColor: color.bgWhite,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                }}
            >
                <Image
                    source={{ uri: props.item.profilePic }}
                    resizeMode="cover"
                    style={{
                        height: PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get()),
                        width: PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get()),
                        borderRadius: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
                        marginRight: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
                    }}
                />
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={[
                                styles.textStyle,
                                {
                                    fontWeight: 'bold',
                                    fontFamily: FontFamily.Roboto_Bold,
                                    fontSize: 16 / PixelRatio.getFontScale(),
                                },
                            ]}
                        >
                            {props.item.Name}
                        </Text>
                        <Entypo
                            name="dot-single"
                            size={20 / PixelRatio.getFontScale()}
                            color={color.black}
                        />
                        <Text
                            style={[
                                styles.textStyle,
                                { fontSize: 12 / PixelRatio.getFontScale() },
                            ]}
                        >
                            {props.item.Time}
                        </Text>
                    </View>

                    <Text
                        numberOfLines={1}
                        style={[
                            styles.textStyle,
                            { marginRight: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) },
                        ]}
                    >
                        {props.item.Decription}
                    </Text>
                </View>
                <AntDesign
                    name="right"
                    style={{ textAlign: 'right' }}
                    size={20 / PixelRatio.getFontScale()}
                    color={color.black}
                />
            </TouchableOpacity>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 12 / PixelRatio.getFontScale(),
        color: color.black,
        fontFamily: FontFamily.Roboto_Light
    },
    leftAction: {
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
        backgroundColor: color.white,
        justifyContent: 'center',
        flex: 1,
    },
    rightAction: {
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
        backgroundColor: color.red,
        justifyContent: 'center',
        flex: 1,
    },
});

export default SwipeableItem;
