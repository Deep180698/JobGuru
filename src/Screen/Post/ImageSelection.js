import { PixelRatio, StyleSheet, ScrollView, Text, TouchableOpacity, View, FlatList, Dimensions, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'
const screenWidth = Dimensions.get('window').width;
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontFamily from '../../Utils/FontFamily'
import { Wizard } from 'react-native-ui-lib';
import CustomNormalRBottomSheet from '../../Component/CustomNormalRBottomSheet';
import CustomAlert from '../../Component/CustomAlert';
import CustomLoader from '../../Component/CustomLoader';

const ImageSelection = (props) => {

    const bottomSheetRef = useRef();


    const openBottomSheet = () => {

        bottomSheetRef.current.open();
    };
    const closeBottomSheet = () => {
        bottomSheetRef.current.close();
    };
    const [state, setState] = useState({
        imageList: [],
        isNext: '1',
        isOpen: false,
        isVisible: false,
        isAlert: false,
        activeIndex: 0,
        completedStepIndex: null,
    });


    useEffect(() => {

    }, [])



    const getImagesGallary = (item) => {
        console.log(item);
        item.map((i) => {
            if (i.path) {
                state.imageList.push(i)
            }
        })
        setState({
            ...state,
            isOpen: false,
        });
        closeBottomSheet()
    };
    const getImagesCamera = (item) => {

        if (item.path) {
            state.imageList.push(item)
        }
        setState({
            ...state,
            isOpen: false,
        });
        closeBottomSheet()
    };

    const removeImage = (item, index) => {
        const newArray = [...state.imageList];
        newArray.splice(index, 1); // Remove 1 element at the specified index
        setState({
            ...state,
            imageList: newArray,
        });
    };


    const getCall = (item) => {

        if (state.type == 'imageSelection') {

            if (item.length > 0) {
                getImagesGallary(item)
                closeBottomSheet()

            } else {
                getImagesCamera(item)
                closeBottomSheet()

            }

        }
    }
    const getStepState = (index) => {
        const state1 = Wizard.States.DISABLED;
        if (state.completedStepIndex && state.completedStepIndex > index - 1) {
            state1 = Wizard.States.COMPLETED;
        } else if (state.activeIndex === index || state.completedStepIndex === index - 1) {
            state1 = Wizard.States.ENABLED;
        }
        return state1;
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={[styles.imageListStyel, { paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => removeImage(item, index)} style={{ position: 'absolute', right: 0, top: 0, zIndex: 2, backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }} >
                    <AntDesign name='closecircle' color={color.red} size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} />
                </TouchableOpacity>
                <Image source={{ uri: item.path }} style={styles.image} />
            </View>
        )
    };

    const ImagePickerItem = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()), flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={[styles.textStyles, { color: color.black }]}>{"Please select an image for the post."}</Text>
                </View>
                <View style={{
                    flex: 1,
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
                    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
                }}>
                    <TouchableOpacity onPress={() => [setState({
                        ...state,
                        type: 'imageSelection',
                    }), openBottomSheet()]}

                        activeOpacity={0.6} style={[{ width: '100%', marginVertical: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()), paddingVertical: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: color.gray, borderStyle: 'dashed' }]}>
                        <AntDesign name='plus' size={PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get())} color={color.gray} />
                    </TouchableOpacity>
                    <FlatList
                        data={state.imageList}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                    />
                </View>
                {/* Next btn */}
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('PostScreen', { ImageData: state.imageList})}
                    activeOpacity={0.6} style={styles.floatBtnStyle}>
                    <Text style={[styles.textStyles, { color: color.white }]}>{"Next"}</Text>
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <CustomLoader isVisible={state.isVisible} />

           

         
                <View style={styles.container}>
                    <Header screenName={"normal"} title={'Post'} onPress={() => props.navigation.goBack()} />
                    <Wizard activeIndex={state.activeIndex} onActiveIndexChanged={() => { }}>
                        <Wizard.Step state={() => getStepState(0)} label={'Image Selection'} />
                        <Wizard.Step state={() => getStepState(1)} label={'Post details'} />
                    </Wizard>

                    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>

                        {/*  page */}
                        {state.isNext === '1' ? ImagePickerItem() : null}


                        <CustomNormalRBottomSheet multiple={state.multiple} getCall={state.type} refBottomSheet={bottomSheetRef} data={(item) => getCall(item)} />
                        <CustomAlert onClose={() => setState({ ...state, isAlert: false })} visible={state.isAlert} alert={'normal'} message={state.message} />
                    </ScrollView>
                </View >
                
        </View>
    )
}


export default ImageSelection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    btnStyles: {
        backgroundColor: color.black,
        padding: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get())
    },
    textStyles: {
        color: color.black,
        fontSize: 12 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Regular,
    },
    imageListStyel: {
        aspectRatio: 1,

    },
    ProfileImage: {
        width: PixelRatio.getPixelSizeForLayoutSize(80 / PixelRatio.get()),
        height: PixelRatio.getPixelSizeForLayoutSize(80 / PixelRatio.get()),
        borderRadius: 15,
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        resizeMode: 'contain'
    },
    image: {
        width: screenWidth / 3 - PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get()),
        height: screenWidth / 3 - PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        resizeMode: 'contain',
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    floatBtnStyle: {
        alignSelf: 'flex-end',
        margin: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
        backgroundColor: color.black,
    },

    blockStyle: {
        borderWidth: 1,
        borderColor: color.black,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        alignItems: 'center',
        flexDirection: 'row'
    },
    
})