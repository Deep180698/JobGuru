import { View, Text, StyleSheet, PixelRatio, Image, Dimensions, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import color from '../../Utils/Color'
import FontFamily from '../../Utils/FontFamily'
const { height, width } = Dimensions.get('screen')
import Swiper from 'react-native-swiper';
import CustomButton from '../../Component/CustomButton'
const OnBordingScreen = (props) => {
    const [index, setIndex] = useState(0);

    const swiperRef = useRef(null);
    const goToNextSlide = () => {
        if (swiperRef.current) {
         
            swiperRef.current.scrollBy(1);
        }
    };
    const goToNextSlide1 = (i) => {
       
            const currentIndex = i;
            setIndex(currentIndex);
        
    };
    const goToSkipSlide = () => {
        props.navigation.reset({
            index: 0,
            routes: [{ name: "AuthScreen" }],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar showHideTransition={true} translucent={true} backgroundColor="transparent" barStyle={"dark-content"} />
            <Swiper
                ref={swiperRef}
                style={styles.wrapper}
                showsButtons={false}
                loop={false}
                autoplayTimeout={2}
                activeDotColor={color.primerycolor}
                dotStyle={{ marginBottom: 50 }}
                activeDotStyle={{ marginBottom: 50 }}
                onIndexChanged={(i)=>goToNextSlide1(i)}
                paginationStyle={{ bottom: PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get()) }}
            >
                <View style={styles.slide}>
                    <View style={{ flex: 1, }}>
                        <Image resizeMode='contain'
                            source={require('../../assets/Ellipse.png')}
                            style={[styles.imageContainer]} />

                        <View style={{ flex: 1 }}>
                            <Image resizeMode='contain'
                                source={require('../../assets/bordingImage1.png')}
                                style={[styles.imageContainer]} />


                            <View style={{ alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }}>
                                <Text style={[[styles.textStyles, { fontSize: 20 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold, }]]}>{'Search your job'}</Text>
                                <Text style={[styles.textStyles, { fontSize: 16 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Light }]}>{'Figure out your top five priorities whether it is company culture, salary.'}</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.slide}>
                    <View style={{ flex: 1 }}>
                        <Image resizeMode='contain'
                            source={require('../../assets/Ellipse.png')}
                            style={[styles.imageContainer]} />

                        <View style={{ flex: 1 }}>
                            <Image resizeMode='contain'
                                source={require('../../assets/bordingImage2.png')}
                                style={[styles.imageContainer]} />


                            <View style={{ alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }}>
                                <Text style={[[styles.textStyles, { fontSize: 20 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold, }]]}>{'Browse jobs list'}</Text>
                                <Text style={[styles.textStyles, { fontSize: 16 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Light }]}>{'Our job list include several  industries, so you can find the best job for you.'}</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.slide}>
                    <View style={{ flex: 1 }}>
                        <Image resizeMode='contain'
                            source={require('../../assets/Ellipse.png')}
                            style={[styles.imageContainer]} />

                        <View style={{ flex: 1 }}>
                            <Image resizeMode='contain'
                                source={require('../../assets/bordingImage2.png')}
                                style={[styles.imageContainer]} />


                            <View style={{ alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }}>
                                <Text style={[[styles.textStyles, { fontSize: 20 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold, }]]}>{'Apply to best jobs'}</Text>
                                <Text style={[styles.textStyles, { fontSize: 16 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Light }]}>{'You can apply to your desirable jobs very quickly and easily with ease.'}</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.slide}>
                    <View style={{ flex: 1 }}>
                        <Image resizeMode='contain'
                            source={require('../../assets/Ellipse.png')}
                            style={[styles.imageContainer]} />

                        <View style={{ flex: 1 }}>
                            <Image resizeMode='contain'
                                source={require('../../assets/bordingImage2.png')}
                                style={[styles.imageContainer]} />


                            <View style={{ alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }}>
                                <Text style={[[styles.textStyles, { fontSize: 20 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold, }]]}>{'Make your career'}</Text>
                                <Text style={[styles.textStyles, { fontSize: 16 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Light }]}>{'We help you find your dream job based on your skillset, location, demand.'}</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.slide}>
                    <View style={{ flex: 1 }}>
                        <Image resizeMode='contain'
                            source={require('../../assets/Ellipse.png')}
                            style={[styles.imageContainer]} />

                        <View style={{ flex: 1 }}>
                            <Image resizeMode='contain'
                                source={require('../../assets/bordingImage2.png')}
                                style={[styles.imageContainer]} />


                            <View style={{ alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }}>
                                <Text style={[[styles.textStyles, { fontSize: 20 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold, }]]}>{'Search your dream job fast and ease'}</Text>
                                <Text style={[styles.textStyles, { fontSize: 16 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Light }]}>{'Figure out your top five priorities -- whether it is company culture, salary or a specific job position.'}</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.slide}>
                    <View style={{ flex: 1 }}>
                        <Image resizeMode='contain'
                            source={require('../../assets/Ellipse.png')}
                            style={[styles.imageContainer]} />

                        <View style={{ flex: 1 }}>
                            <Image resizeMode='contain'
                                source={require('../../assets/bordingImage2.png')}
                                style={[styles.imageContainer]} />

                            <View style={{ alignItems: 'center', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }}>
                                <Text style={[[styles.textStyles, { fontSize: 20 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold, }]]}>{'Make your dream career with job'}</Text>
                                <Text style={[styles.textStyles, { fontSize: 16 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Light }]}>{'We help you find your dream job according to your skillset, location & preference to build your career.'}</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </Swiper>
            <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()) }}>
                <View style={{ flexDirection: 'row', marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                    { index !== 5  ? (
                        <>
                            <CustomButton
                                onPress={goToSkipSlide}
                                text="Skip"
                                backgroundColor={color.background}
                                textColor={color.gray}
                                btnStyle={{ flex: 1 }}
                            />
                            <CustomButton
                                onPress={goToNextSlide}
                                text="Next"
                                backgroundColor={color.primerycolor}
                                textColor={color.white}
                                btnStyle={{ flex: 1 }}
                            />
                        </>
                    ) : (
                        <CustomButton
                            onPress={goToSkipSlide}
                            text="Explore"
                            backgroundColor={color.primerycolor}
                            textColor={color.white}
                            btnStyle={{ flex: 1 }}
                        />
                    )}
                </View>
                <Image resizeMode='contain' source={require('../../assets/Home_Indicator_Black.png')} style={[styles.dashContainer]} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        height: height / 4,
        width: width
    },
    btnStyle: {
        flex: 1,
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
    },
    dashContainer: {
        height: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
        width: width,
        justifyContent: 'flex-end'
    },
    textStyles: {
        color: color.black,
        fontSize: 16 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Regular,
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        textAlign: 'center',
    },
})

export default OnBordingScreen