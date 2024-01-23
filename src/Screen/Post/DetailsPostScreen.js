import { PixelRatio, StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'
import ImageCarousel from '../../Component/ImageCarousel'
import AppConstants from '../../Storage/AppConstants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
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
        "firstName": props.route.params.postData.firstName,
        "images": props.route.params.postData.images,
        "isFavourite": props.route.params.postData.isFavourite,
        "jobType": props.route.params.postData.jobType,
        "lastName": props.route.params.postData.lastName,
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
        const phoneNumberToDial = `tel:${postData.mobileNumber}`;
        Linking.openURL(phoneNumberToDial);
    }

    return (
        <View style={styles.container}>
            <ParallaxScrollView
                backgroundColor={color.black}
                contentBackgroundColor={color.bgWhite}
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
                    <View style={{}}>
                        <ImageCarousel style={styles.containerImageStyle} images={formattedImages} />
                    </View>
                )}>
                <Animatable.View duration={1000} animation={"slideInUp"} style={[{ flex: 1, backgroundColor: color.bgWhite, borderRadius: 15 }]}>
                    <View style={{marginTop:10}}>
                        <Image source={{uri:AppConstants.AsyncKeyLiterals.Base_URL+'/'+ postData.profileImage}} style={styles.profileStyle}/>
                    </View>
                   
                    <View style={{
                        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                        marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.textStyle, { fontFamily: FontFamily.Roboto_black, fontSize: 14 / PixelRatio.getFontScale() }]}>{postData.title}</Text>
                                <Text style={[styles.textStyle, { marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()) }]}>{postData.description}</Text>
                            </View>
                            <TouchableOpacity onPress={() => onSelectFavourite()}>
                                <Animatable.View animation={postData.isFavourite ? 'bounceIn' : null}>
                                    <MaterialCommunityIcons
                                        name={postData.isFavourite ? 'bookmark' : 'bookmark-outline'}
                                        size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())}
                                        color={color.black}
                                    />
                                </Animatable.View>
                            </TouchableOpacity>
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


                    <View style={styles.btnContainer}>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <View style={{ flex: 1, marginRight: 5 }}>
                                <CustomButton onPress={handleDialPress}
                                    text={"Call"}
                                    style={{ backgroundColor: color.black, paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()) }}
                                    textStyle={[{ color: color.white }]}
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 5 }}>
                                <CustomButton press={() => props.navigation.navigate('DetailsPostScreen', { postData: item })}
                                    text={"Message"}
                                    style={{ backgroundColor: color.black, paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()) }}
                                    textStyle={[{ color: color.white }]}
                                />
                            </View>
                        </View>
                        <View style={{ margin: 5 }}>
                            <CustomButton
                                press={() => props.navigation.navigate('DetailsPostScreen', { postData: item })}
                                text={"Apply Now"} style={{ backgroundColor: color.black, paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()) }}
                                textStyle={[{ color: color.white }]}
                            />
                        </View>
                    </View>
                </Animatable.View >
            </ParallaxScrollView>
        </View>
    )
}

export default DetailsPostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.bgWhite
    },
    profileStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(80 / PixelRatio.get()),
        width: PixelRatio.getPixelSizeForLayoutSize(80 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
        resizeMode: "contain"
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
    containerImageStyle:{
        backgroundColor: color.white,
        resizeMode: 'contain',
        width: Dimensions.get('window').width,
        height: PixelRatio.getPixelSizeForLayoutSize(250 / PixelRatio.get()), // adjust the height as needed
      }
})