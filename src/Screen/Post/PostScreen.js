import { PixelRatio, StyleSheet, ScrollView, Text, TouchableOpacity, View, FlatList, Dimensions, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'
const screenWidth = Dimensions.get('window').width;
// import { Checkbox } from 'react-native-paper';
import { Checkbox } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontFamily from '../../Utils/FontFamily'
import { Wizard } from 'react-native-ui-lib';
import CustomTextInput from '../../Component/CustomTextInput'
import CustomAddress from '../../Component/CustomAddress'
import cacheData from '../../Storage/cacheData';
import AppConstants from '../../Storage/AppConstants';
import axios from 'axios';
import CustomRBottomSheet from '../../Component/CustomRBottomSheet';
import CustomNormalRBottomSheet from '../../Component/CustomNormalRBottomSheet';
import CustomAlert from '../../Component/CustomAlert';
import CustomLoader from '../../Component/CustomLoader';
const checkboxItems = [
    'FullTime', 'PartTime', 'Seasonal',
    'Contract', 'Freelance', 'Internship',
    'Temporary', 'Remote', 'Other'
];
const PostScreen = (props) => {

    const bottomSheetRef = useRef();
    const bottomSheetRef1 = useRef();


    const openBottomSheet = () => {

        bottomSheetRef.current.open();
    };
    const closeBottomSheet = () => {
        bottomSheetRef.current.close();
    };

    const [state, setState] = useState({
        imageList: props.route.params.ImageData || [],
        firstName: '',
        lastName: '',
        profileImage: '',
        title: '',
        address: '',
        type: '',
        additionalNote: '',
        texts: [],
        isNext: '2',
        description: '',
        message: '',
        salary: '',
        selectedType: [],
        isOpen: false,
        skillsOpen: false,
        multiple: true,
        addresOpen: false,
        isVisible: false,
        isAlert: false,
        activeIndex: 1,
        completedStepIndex: null,
    });
    const [isVisible, setIsVisible] = useState(false)


    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        const data = await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.IS_AUTH)
        console.log(data);
        setState({
            ...state,
            firstName: data?.data?.userData?.firstName,
            lastName: data?.data?.userData?.lastName,
            profileImage: data?.data?.userData?.profileImage,
        });
    }

    // JobType picker
    const handleCheckboxChange = (jobType) => {
        const isSelected = state.selectedType.includes(jobType);

        const updatedjobTypes = isSelected
            ? state.selectedType.filter((item) => item !== jobType)
            : [...state.selectedType, jobType];


        setState({
            ...state,
            selectedType: updatedjobTypes,
        });
    };

    const createPost = async () => {

        setIsVisible(true)

        const formData = new FormData();

        state.imageList.forEach((image, index) => {
            const pathSegments = image.path.split('/');

            const imageName = pathSegments[pathSegments.length - 1];
            formData.append("images", {
                uri: image.path,
                type: image.mime,
                name: imageName,
            });
        });
        formData.append("title", state.title)
        formData.append("description", state.description)
        formData.append("salary", state.salary)
        formData.append("skills", state.texts.join(', '))
        formData.append("jobType", state.selectedType.join(', '))
        formData.append("additionalNote", state.additionalNote)
        formData.append("address", state.address)

        console.log(JSON.stringify(formData));
        const headers = {
            'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
            'Content-Type': 'multipart/form-data'
        }
        await axios({
            method: 'POST',
            url: AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.CreatPost,
            data: formData,
            headers: headers
        }).then(response => {
            console.log("status", response.status);
            setIsVisible(false)

            props.navigation.replace('BottomNavigator')
        }).catch(error => {
            if (error.response.status === 401) {
                setIsVisible(false)

                setState({
                    ...state, message: error.response.data.error, isAlert: true
                })

            } else {
                setIsVisible(false)

                setState({
                    ...state, message: error.message, isAlert: true
                })
            }
        });
    }

    const getCall = (item) => {

        if (state.type == 'AddSkills') {
            console.log("item", item);
            setState({
                ...state,
                texts: item
            })
            closeBottomSheet()

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
    const handleItemPress = (index) => {
        // Create a copy of the array
        const updatedTexts = [...state.texts];

        // Remove the item at the specified index
        updatedTexts.splice(index, 1);

        // Update the state with the new array
        setState({
            ...state,
            texts: updatedTexts
        })
    };

    const renderSkillsItem = ({ item, index }) => (
        <View>
            <View style={styles.item}>
                <Text style={[styles.textStyles, { color: color.white }]}>{item}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={() => handleItemPress(index)} style={{ position: 'absolute', right: 0, top: 0, zIndex: 2, backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }} >
                <AntDesign name='closecircle' color={color.red} size={PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get())} />
            </TouchableOpacity>
        </View>
    );
    const renderCheckItem = ({ item, index }) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: screenWidth / 2.5,
                marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
                marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
            }}>
                <Text style={[styles.textStyles, { width: '40%' }]}>{item}</Text>

                <Checkbox
                    label={item}
                    labelStyle={[styles.textStyles]}
                    status={state.selectedType.includes(item) ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange(item)}
                />
            </View>
        )
    };


    const DescriptionItem = () => {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, justifyContent: 'space-between' }}>

                    {/* description */}
                    <View style={{ marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                        <View style={{
                            flexDirection: 'row',
                            borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                        }}>
                            <Image
                                style={styles.ProfileImage}
                                source={{ uri: state.profileImage ? AppConstants.AsyncKeyLiterals.Base_URL + '/' + state.profileImage : 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' }} />
                            <View style={{ flexDirection: 'row', marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                                <Text style={[styles.textStyles, { fontSize: 16 / PixelRatio.getFontScale(), color: color.black, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{state.firstName}</Text>
                                <Text style={[styles.textStyles, { fontSize: 16 / PixelRatio.getFontScale(), color: color.black, marginLeft: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()) }]}>{state.lastName}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>

                            {/* Titile */}

                            <CustomTextInput
                                value={state.title}
                                onChangeText={(i) => setState({
                                    ...state,
                                    title: i,
                                })}
                                type={"whiteBc"}
                                placeholder={"Title"}
                            />
                            {/* Description */}
                            <CustomTextInput
                                value={state.description}
                                onChangeText={(i) => setState({
                                    ...state,
                                    description: i
                                })}
                                type={"Address"}
                                placeholder={"Description"}
                            />
                            {/* Salary */}
                            <View style={{ justifyContent: 'center' }}>
                                <CustomTextInput
                                    value={state.salary}
                                    onChangeText={(i) => setState({
                                        ...state,
                                        salary: i
                                    })}
                                    type={"whiteBc"}
                                    placeholder={"Salary"}
                                />
                                <TouchableOpacity onPress={() => { }} style={{ position: 'absolute', right: 10 }}>
                                    <Text style={{ color: color.black }}>{`| ${'Hourly'}`}</Text>
                                </TouchableOpacity>
                            </View>


                            {/* Job type */}
                            <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                                <Text style={[styles.textStyles, { flex: 1, color: color.black, fontSize: 12 / PixelRatio.getFontScale() }]} >{"Job Type"}</Text>

                                <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()) }}>


                                    <FlatList
                                        data={checkboxItems}
                                        renderItem={renderCheckItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        numColumns={2}
                                    />


                                    {/* Skills */}
                                    <TouchableOpacity onPress={() => [setState({
                                        ...state,
                                        // skillsOpen: true,
                                        type: 'AddSkills',
                                    }), openBottomSheet()]}
                                        style={[styles.blockStyle, { marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>
                                        <Text style={styles.textStyles}>{'Add Skills'}</Text>
                                    </TouchableOpacity>
                                    <FlatList
                                        data={state.texts}
                                        renderItem={renderSkillsItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        numColumns={3}
                                    />
                                    {/* Addition note */}
                                    <CustomTextInput
                                        value={state.additionalNote}
                                        onChangeText={(i) => setState({
                                            ...state,
                                            additionalNote: i
                                        })}
                                        type={"Address"}
                                        placeholder={"Additional Note (Optional)"}
                                    />

                                    {/* Address */}
                                    <View style={{ justifyContent: 'center' }}>
                                        <CustomTextInput
                                            value={state.address}

                                            onChangeText={(i) => setState({
                                                ...state,
                                                address: i
                                            })}
                                            type={"whiteBc"}
                                            placeholder={"Address"}
                                        />
                                        <TouchableOpacity onPress={() => setState({
                                            ...state,
                                            addresOpen: true,
                                            skillsOpen: false
                                        })}
                                            style={{ position: 'absolute', right: 10 }}>
                                            <Ionicons name='location-sharp' color={color.black} size={PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ View>
                        </View>
                    </View>
                    {/* Next btn */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} activeOpacity={0.6} style={styles.floatBtnStyle}>
                            <Text style={[styles.textStyles, { color: color.white }]}>{"Back"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => createPost()} activeOpacity={0.6} style={[styles.floatBtnStyle, { left: 0 }]}>
                            <Text style={[styles.textStyles, { color: color.white }]}>{"Upload"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }
    return (
        <View style={styles.container}>
            <CustomLoader isVisible={isVisible} />


            <View style={styles.container}>
                <Header screenName={"normal"} title={'Post'} onPress={() => props.navigation.goBack()} />
                <Wizard activeIndex={state.activeIndex} onActiveIndexChanged={() => { }}>
                    <Wizard.Step state={() => getStepState(0)} label={'Image Selection'} />
                    <Wizard.Step state={() => getStepState(1)} label={'Post details'} />
                </Wizard>

                <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>

                    {/*  page */}
                    {state.isNext === '2' ? DescriptionItem() : null}

                    <CustomRBottomSheet multiple={state.multiple} getCall={state.type} refBottomSheet={bottomSheetRef} data={(item) => getCall(item)} />
                    <CustomAlert onClose={() => setState({ ...state, isAlert: false })} visible={state.isAlert} alert={'normal'} message={state.message} />
                </ScrollView>
            </View >

        </View>
    )
}


export default PostScreen

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
    item: {
        backgroundColor: color.black,
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
    }

})