import { PixelRatio, StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'
import ImageCarousel from '../../Component/ImageCarousel'
import AppConstants from '../../Storage/AppConstants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';
import FontFamily from '../../Utils/FontFamily'
import CustomButton from '../../Component/CustomButton'
import cacheData from '../../Storage/cacheData'
import axios from 'axios'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import CustomTextInput from '../../Component/CustomTextInput'


const DetailsPostScreen = (props) => {
    // const { postData } = props.route.params
    const [message, setMessage] = useState('')
    const [postData, setPostData] = useState({

        "_id": props.route.params.postData._id,
        "additionalNote": props.route.params.postData.additionalNote,
        "address": props.route.params.postData.address,
        "createdAt": props.route.params.postData.createdAt,
        "description": props.route.params.postData.description,
        "firstName": props.route.params.postData.UserData.firstName,
        "images": props.route.params.postData.images,
        "isFavourite": props.route.params.postData.isFavourite,
        "jobType": props.route.params.postData.jobType,
        "lastName": props.route.params.postData.UserData.lastName,
        "profileImage": props.route.params.postData.UserData.profileImage,
        "salary": props.route.params.postData.salary,
        "skills": props.route.params.postData.skills,
        "title": props.route.params.postData.title,
        "mobileNumber": props.route.params.postData.mobileNumber
    })
    const formattedImages = postData.images.map((image) => ({
        uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + image.name
    }));
    useEffect(() => {
        console.log(props.route.params.postData);
    }, [])

    const onSelectFavourite = async () => {

        const headers = {
            'Content-Type': 'application/json',
            'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
        }
        const body = {
            "postID": postData._id,
            "isFavourite": !postData.isFavourite

        }
        await axios({
            method: 'POST',
            url: AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.postFavourite,
            data: body,
            headers: headers
        }).then(response => {
            console.log(response.data);
            setPostData({
                ...postData,
                isFavourite: !postData.isFavourite
            })

        });

    }

    const handleDialPress = () => {
        bounceView.bounceIn();
        setTimeout(() => {
            const phoneNumberToDial = `tel:${postData.mobileNumber}`;
            Linking.openURL(phoneNumberToDial);
        }, 500);

    }

    return (
        <View style={styles.container}>
            <ParallaxScrollView
                backgroundColor={color.black}
                contentBackgroundColor={color.white}
                parallaxHeaderHeight={PixelRatio.getPixelSizeForLayoutSize(250 / PixelRatio.get())}
                stickyHeaderHeight={50} // Adjust as needed
                renderFixedHeader={() => (
                    <View style={{}}>
                        <Header
                            onPress={() => props.navigation.goBack()}
                            title={'Post'}
                            screenName={'normal'}
                        />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                renderForeground={() => (
                    <View style={{marginTop:50}}>
                        <TouchableOpacity style={styles.favoriteButton} onPress={() => onSelectFavourite()}>
                            <Animatable.View animation={postData.isFavourite ? 'bounceIn' : null}>
                                <Ionicons
                                    name={postData.isFavourite ? 'heart' : 'heart-outline'}
                                    size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())}
                                    color={color.black}
                                />
                            </Animatable.View>
                        </TouchableOpacity>

                        <ImageCarousel style={styles.containerImageStyle} images={formattedImages} />
                    </View>
                )}>

                <Animatable.View duration={1000} animation={"slideInUp"} style={[{ flex: 1, backgroundColor: color.white, borderRadius: 15 }]}>
                    <View style={{
                        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                    }}>
                        <View style={{ marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + postData.profileImage }} style={styles.profileStyle} />
                            <Text style={[styles.textStyle, { flex: 1, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), fontFamily: FontFamily.Roboto_black, fontSize: 14 / PixelRatio.getFontScale() }]}>{`${postData.firstName} ${postData.lastName}`}</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={{
                                        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                                    }}
                                    onPress={handleDialPress}
                                >
                                    <Animatable.View ref={(ref) => (bounceView = ref)} animation={'bounceIn'}>
                                        <Ionicons
                                            name='call'
                                            size={20 / PixelRatio.getFontScale()}
                                            color={color.white}
                                            style={{
                                                backgroundColor: color.black,
                                                borderRadius: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
                                                padding: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
                                            }}
                                        />
                                    </Animatable.View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                                }}>
                                    <Feather name='message-circle' size={20 / PixelRatio.getFontScale()} color={color.white}
                                        style={{
                                            backgroundColor: color.black,
                                            borderRadius: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
                                            padding: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
                                        }} />
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.textStyle, { fontFamily: FontFamily.Roboto_black, fontSize: 14 / PixelRatio.getFontScale() }]}>{postData.title}</Text>
                                <Text style={[styles.textStyle, { marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()) }]}>{postData.description}</Text>
                            </View>
                            {/* <TouchableOpacity onPress={() => onSelectFavourite()}>
                                <Animatable.View animation={postData.isFavourite ? 'bounceIn' : null}>
                                    <MaterialCommunityIcons
                                        name={postData.isFavourite ? 'bookmark' : 'bookmark-outline'}
                                        size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())}
                                        color={color.black}
                                    />
                                </Animatable.View>
                            </TouchableOpacity> */}

                        </View>
                        <View style={{ marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyle, { fontSize: 14 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_black }]}>{'Additional information'}</Text>
                            <Text style={[styles.textStyle]}>{postData.additionalNote}</Text>
                        </View>
                        <View style={{ marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyle, { fontSize: 14 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_black }]}>{'skills'}</Text>
                            <Text style={[styles.textStyle]}>{postData.skills}</Text>
                        </View>
                        <View style={{ marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyle, { fontSize: 14 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_black }]}>{'Job Type'}</Text>
                            <Text style={[styles.textStyle]}>{postData.jobType}</Text>
                        </View>
                        <View style={{ marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyle, { fontSize: 14 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_black }]}>{'Job Address'}</Text>
                            <Text style={[styles.textStyle]}>{postData.address}</Text>
                        </View>

                    </View>

                    <CustomButton
                        press={() => props.navigation.navigate('DetailsPostScreen', { postData: item })}
                        text={"Apply Direct"} style={{
                            backgroundColor: color.black, paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), alignSelf: 'center', borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
                        }}
                        textStyle={[{ color: color.white }]}
                    />
                </Animatable.View >
            </ParallaxScrollView>
        </View>
    )
}

export default DetailsPostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.bgWhite,

    },
    profileStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(80 / PixelRatio.get()),
        width: PixelRatio.getPixelSizeForLayoutSize(80 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
        resizeMode: "contain",
    },
    textStyle: {
        fontSize: 12 / PixelRatio.getFontScale(),
        color: color.black,
        fontFamily: FontFamily.Roboto_Light
    },
    btnStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: color.black,
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
    },
    btnContainer: {
        backgroundColor: color.bgWhite,
        marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
    },
    containerImageStyle: {
        backgroundColor: color.white,
        resizeMode: 'contain',
        width: Dimensions.get('window').width,
        height: PixelRatio.getPixelSizeForLayoutSize(250 / PixelRatio.get()), // adjust the height as needed
    },
    favoriteButton: {
        position: 'absolute',
        backgroundColor: color.transparent,
        right: 0,
        top:0,
        bottom:0,
        zIndex:2,
        padding: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    },
})