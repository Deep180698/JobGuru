import { View, Text, Image, StyleSheet, PixelRatio, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../Component/Header'
import cacheData from '../../Storage/cacheData'
import AppConstants from '../../Storage/AppConstants'
import CustomLoader from '../../Component/CustomLoader'
import color from '../../Utils/Color'
import FontFamily from '../../Utils/FontFamily'
import NoRecordFound from '../../Component/NoRecordFound'
import apiCall from '../../Utils/apiCall'
import ImageCarousel from '../../Component/ImageCarousel';
import * as Animatable from 'react-native-animatable';
import Ionicons from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get('window');

const UserProfile = (props) => {
    const [data, setData] = useState(null); // Initialize data as null
    const [postData, setPostData] = useState(null); // Initialize data as null
    const [loading, setLoading] = useState(true); // Initialize loading state as true

    useEffect(() => {
        getData();
        getPostData();
    }, []);

    const getData = async () => {
        try {
            const dataFromCache = await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.IS_AUTH);
            if (dataFromCache.data && dataFromCache.data.userData) {
                setData(dataFromCache.data.userData);
                setLoading(false); // Set loading to false when data is retrieved
                console.log(dataFromCache.data.userData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getPostData = async () => {
        const headers = {
            'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
        }
        const result = await apiCall.apiGETCall(AppConstants.AsyncKeyLiterals.getMyPost, headers);
        setPostData(result)

    }
    // render list
    const renderItem = ({ item, index }) => {


        return (

            <View style={styles.container}>
                <View style={styles.cardContainer}>

                    <TouchableOpacity style={styles.favoriteButton} onPress={() => onSelectFavourite(item, index)}>
                        <Animatable.View animation={item.isFavourite ? 'bounceIn' : null}>
                            <Ionicons
                                name={item.isFavourite ? 'heart' : 'heart-outline'}
                                size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())}
                                color={color.white}
                            />
                        </Animatable.View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => props.navigation.navigate('DetailsPostScreen', { postData: item })}
                        style={styles.detailsContainer}
                    >
                        <Image source={{ uri: `${AppConstants.AsyncKeyLiterals.Base_URL}/${item.UserData.profileImage}` }} style={styles.profileStyle} />
                        <Text numberOfLines={2} style={[styles.textStyle, { flex: 1, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <CustomLoader isVisible={loading} />
            <Header screenName={'userProfile'} title={"Profile"} onNavigate={()=>props.navigation.navigate('Profile')} onPress={() => props.navigation.goBack()} />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
            }}>
                {data && data.profileImage && (
                    <Image style={styles.imageContainer1} source={{ uri: AppConstants.AsyncKeyLiterals.Base_URL + '/' + data.profileImage }} />
                )}
                {data && data.firstName && data.lastName && (
                    <Text style={[styles.textStyle, { fontSize: 22 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold, marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>
                        {data.firstName + ' ' + data.lastName}
                    </Text>)}

            </View>
            <View style={{
                flexDirection: 'row',
                marginTop: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
            }}>
                <TouchableOpacity style={styles.boxContainer}>
                    <Text style={[styles.boxtextStyle, { fontFamily: FontFamily.Roboto_Bold }]}>{'27'}</Text>
                    <Text style={[styles.boxtextStyle, { color: color.textColor1 }]}>{'Applied'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxContainer}>
                    <Text style={[styles.boxtextStyle, { fontFamily: FontFamily.Roboto_Bold }]}>{'19'}</Text>
                    <Text style={[styles.boxtextStyle, { color: color.textColor1 }]}>{'Reviewed'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxContainer}>
                    <Text style={[styles.boxtextStyle, { fontFamily: FontFamily.Roboto_Bold }]}>{'14'}</Text>
                    <Text style={[styles.boxtextStyle, { color: color.textColor1 }]}>{'Interview'}</Text>
                </TouchableOpacity>

            </View>

            <View style={{
                flexDirection: 'row',
                marginTop: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
                justifyContent: 'space-between',
                

            }}>
                <Text style={[styles.boxtextStyle, { flex: 1, fontFamily: FontFamily.Roboto_Bold, fontSize: 18 / PixelRatio.getFontScale() }]}>{'Resume'}</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('FileUpload')} style={[{}]}>
                    <Text style={[styles.boxtextStyle, { color: color.primerycolor, fontFamily: FontFamily.Roboto_Regular, fontSize: 18 / PixelRatio.getFontScale() }]}>{'Add Resume'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                flexDirection: 'row',
                marginTop: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
                justifyContent: 'space-between',

            }}>
                <Text style={[styles.boxtextStyle, { flex: 1, fontFamily: FontFamily.Roboto_Bold, fontSize: 18 / PixelRatio.getFontScale() }]}>{'Portfolio'}</Text>
                <TouchableOpacity style={[{}]}>
                    <Text style={[styles.boxtextStyle, { color: color.primerycolor, fontFamily: FontFamily.Roboto_Regular, fontSize: 18 / PixelRatio.getFontScale() }]}>{'See All'}</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
    },
    textStyle: {
        fontSize: 14 / PixelRatio.getFontScale(),
        color: color.black,
        fontFamily: FontFamily.Roboto_Regular
    },
    imageContainer1: {
        resizeMode: 'contain',
        width: PixelRatio.getPixelSizeForLayoutSize(120 / PixelRatio.get()),
        height: PixelRatio.getPixelSizeForLayoutSize(120 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
    },
    containerImageStyle: {
        borderRadius: 20,
        resizeMode: 'stretch',
        width: width / 2 - PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), // Adjusted width
        height: height * 0.3, // Adjust the percentage as needed
    },

    cardContainer: {
        backgroundColor: color.white,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        backgroundColor: color.white,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    favoriteButton: {
        position: 'absolute',
        backgroundColor: color.transparent,
        right: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        padding: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    },
    detailsContainer: {
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxtextStyle: {
        fontSize: 16 / PixelRatio.getFontScale(),
        color: color.black,
        fontFamily: FontFamily.Roboto_Regular,
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get())
    }
});

export default UserProfile;
