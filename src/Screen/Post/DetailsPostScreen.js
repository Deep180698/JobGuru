import { PixelRatio, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
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

const DetailsPostScreen = (props) => {
    // const { postData } = props.route.params
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
        "profileImage": props.route.params.postData.profileImage,
        "salary": props.route.params.postData.salary,
        "skills": props.route.params.postData.skills,
        "title": props.route.params.postData.title
    })
    const formattedImages = postData.images.map((image) => ({
        uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + image.name
    }));
    useEffect(() => {
        console.log(postData);
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
        const phoneNumberToDial = `tel:${'7059757158'}`;
        Linking.openURL(phoneNumberToDial);
    }

    return (
        <View style={styles.container}>
            <Header onPress={() => props.navigation.goBack()} title={"Post"} screenName={"normal"} />
            <View style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderBottomWidth: 1,
                borderColor: color.black
            }}>
                <ImageCarousel images={formattedImages} />

            </View>
            <View style={{
                flex: 1, backgroundColor: color.white,
                borderTopLeftRadius: PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get()),
                borderTopRightRadius: PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get()),
                marginTop: PixelRatio.getPixelSizeForLayoutSize(-40 / PixelRatio.get())

            }}>
                <View style={{
                    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get())
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
            </View>

            {/* call and message container */}
            <View style={styles.btnContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={handleDialPress} activeOpacity={0.6} style={styles.btnStyle}>
                        <Text style={[styles.textStyle, { color: color.white, fontSize: 16 / PixelRatio.getFontScale() }]}>{'Call'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={styles.btnStyle}>
                        <Text style={[styles.textStyle, { color: color.white, fontSize: 16 / PixelRatio.getFontScale() }]}>{'Message'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.6} style={[styles.btnStyle,{flex:0,marginVertical:PixelRatio.getPixelSizeForLayoutSize(10/PixelRatio.get())}]}>
                    <Text style={[styles.textStyle, { color: color.white, fontSize: 16 / PixelRatio.getFontScale() }]}>{'Apply Now'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DetailsPostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    heartPositionStyle: {
        position: 'absolute',
        right: 0,
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
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

        marginBottom: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
    }
})