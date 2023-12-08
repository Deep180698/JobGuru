import { PixelRatio, StyleSheet, ScrollView, Text, TouchableOpacity, View, FlatList, Dimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'
import JSONList from '../../JSON/JSONList'
const screenWidth = Dimensions.get('window').width;
import { Checkbox } from 'react-native-paper';
import CustomBottomSheet from '../../Component/CustomBottomSheet'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontFamily from '../../Utils/FontFamily'
import { Wizard, WizardStep } from 'react-native-ui-lib';
import { KeyboardAvoidingView } from 'react-native'

const PostScreen = (props) => {

    const [imageList, setImageList] = useState([])
    const [firstName, setFirstName] = useState('Deep')
    const [lastName, setLastName] = useState('Patel')
    const [title, setTitle] = useState('')
    const [isNext, setIsNext] = useState('1')
    const [description, setDescription] = useState('')
    const [salary, setSalary] = useState('')
    const [selectedType, setSelectedType] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [completedStepIndex, setCompletedStepIndex] = useState();



    useEffect(() => {
        // setImageList(JSONList.Imagelist)
    })

    // JobType picker
    const handleCheckboxChange = (jobType) => {
        const isSelected = selectedType.includes(jobType);

        const updatedjobTypes = isSelected
            ? selectedType.filter((item) => item !== jobType)
            : [...selectedType, jobType];

        setSelectedType(updatedjobTypes);
    };
    const getImages = (item) => {
        if (item.path) {
            console.log("get Images", item);

            imageList.push(item)
        }


        setIsOpen(false)
    };
    const removeImage = (item, index) => {
        const newArray = [...imageList];
        newArray.splice(index, 1); // Remove 1 element at the specified index
        setImageList(newArray);
    };

    const nextItem = (item) => {

        console.log("item", item);
        switch (item) {
            case '1':
                setIsNext('2')
                break;
            case '2':
                setIsNext('1')
                break;
            case 'Next':
                setIsNext('1')
                props.navigation.navigate('HomeScreen')
                break;

            default:
                break;
        }
    };

    const getStepState = (index) => {
        const state = Wizard.States.DISABLED;
        if (completedStepIndex && completedStepIndex > index - 1) {
            state = Wizard.States.COMPLETED;
        } else if (activeIndex === index || completedStepIndex === index - 1) {
            state = Wizard.States.ENABLED;
        }

        return state;
    }
    const renderItem = ({ item, index }) => {
        console.log(item);
        return (
            <View style={[styles.item, { paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>
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
                    <TouchableOpacity onPress={() => setIsOpen(true)} activeOpacity={0.6} style={[{ width: '100%', marginVertical: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()), paddingVertical: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: color.gray, borderStyle: 'dashed' }]}>
                        <AntDesign name='plus' size={PixelRatio.getPixelSizeForLayoutSize(50 / PixelRatio.get())} color={color.gray} />
                    </TouchableOpacity>
                    <FlatList
                        data={imageList}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                    />

                </View>
                {/* Next btn */}
                <TouchableOpacity onPress={() => [nextItem('1'), setActiveIndex(1)]} activeOpacity={0.6} style={styles.floatBtnStyle}>
                    <Text style={[styles.textStyles, { color: color.white }]}>{"Next"}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const DescriptionItem = () => {
        return (
            <View style={{ flex: 1 }}>
                {/* description */}
                <View style={{ marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                    <View style={{
                        flexDirection: 'row',
                        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                    }}>
                        <Image
                            style={styles.ProfileImage}
                            source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' }} />
                        <View style={{ flexDirection: 'row', marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyles, { fontSize: 16 / PixelRatio.getFontScale(), color: color.black, marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{firstName}</Text>
                            <Text style={[styles.textStyles, { fontSize: 16 / PixelRatio.getFontScale(), color: color.black, marginLeft: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()) }]}>{lastName}</Text>
                        </View>
                    </View>
                    <Text style={[styles.textStyles, { color: color.black, fontSize: 16 / PixelRatio.getFontScale(), marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), }]} >{"Post Description"}</Text>

                    <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>

                        {/* Titile */}
                        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyles, { color: color.black, fontSize: 16 / PixelRatio.getFontScale() }]} >{"Title"}</Text>
                            <TextInput
                                value={title}
                                onChangeText={(i) => setTitle(i)}
                                placeholder='Title'
                                style={styles.textInputStyle}

                            />
                        </View>
                        {/* Description */}
                        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyles, { color: color.black, fontSize: 16 / PixelRatio.getFontScale() }]} >{"Description"}</Text>
                            <TextInput
                                value={description}
                                onChangeText={(i) => setDescription(i)}
                                placeholder='Description'
                                style={styles.textInputStyle}
                            />
                        </View>

                        {/* Job type */}
                        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyles, { color: color.black, fontSize: 16 / PixelRatio.getFontScale() }]} >{"Job Type"}</Text>
                            <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                                <Checkbox.Item
                                    label="FullTime"
                                    labelStyle={styles.textStyles}
                                    status={selectedType.includes('FullTime') ? 'checked' : 'unchecked'}
                                    onPress={() => handleCheckboxChange('FullTime')}
                                />
                                <Checkbox.Item
                                    label="PartTime"
                                    labelStyle={styles.textStyles}
                                    status={selectedType.includes('PartTime') ? 'checked' : 'unchecked'}
                                    onPress={() => handleCheckboxChange('PartTime')}
                                />
                                <Checkbox.Item
                                    label="Seasonal"
                                    labelStyle={styles.textStyles}
                                    status={selectedType.includes('Seasonal') ? 'checked' : 'unchecked'}
                                    onPress={() => handleCheckboxChange('Seasonal')}
                                />
                                <Checkbox.Item
                                    label="Contract"
                                    labelStyle={styles.textStyles}
                                    status={selectedType.includes('Contract') ? 'checked' : 'unchecked'}
                                    onPress={() => handleCheckboxChange('Contract')}
                                />
                            </View>
                        </View>

                        {/* Salary */}
                        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyles, { color: color.black, fontSize: 16 / PixelRatio.getFontScale() }]} >{"Salary"}</Text>
                            <TextInput
                                value={salary}
                                onChangeText={(i) => setSalary(i)}
                                placeholder='Salary'
                                style={styles.textInputStyle}
                            />
                        </View>

                    </View>
                </View>
                {/* Next btn */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => [nextItem('2'), setActiveIndex(0)]} activeOpacity={0.6} style={styles.floatBtnStyle}>
                        <Text style={[styles.textStyles, { color: color.white }]}>{"Back"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => nextItem('Next')} activeOpacity={0.6} style={[styles.floatBtnStyle, { left: 0 }]}>
                        <Text style={[styles.textStyles, { color: color.white }]}>{"Next"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Header screenName={"PostScreen"} onPress={() => props.navigation.goBack()} />
            <Wizard activeIndex={activeIndex} onActiveIndexChanged={() => { }}>
                <Wizard.Step state={() => getStepState(0)} label={'Image Selection'} />
                <Wizard.Step state={() => getStepState(1)} label={'Post details'} />
            </Wizard>

            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{flexGrow:1}} style={{flex:1}}>
                    <View style={{ flex: 1, backgroundColor: color.white, paddingTop: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()) }}>

                        {/*  page */}
                        {isNext === '1' ? <ImagePickerItem /> : null}
                        {isNext === '2' ? <DescriptionItem /> : null}

                    </View>

                    <CustomBottomSheet getCall="imageSelection" onClose={() => setIsOpen(false)} isOpen={isOpen} data={(item) => getImages(item)} />
                </ScrollView>
            </KeyboardAvoidingView>
        </View >
    )
}

export default PostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.black
    },
    btnStyles: {
        backgroundColor: color.black,
        padding: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get())
    },
    textStyles: {
        color: color.black,
        fontSize: 14 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Light

    },
    item: {
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
        width: screenWidth / 3.5,
        height: screenWidth / 3.5,
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
    textInputStyle: {
        color: color.black,
        backgroundColor: color.gray,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        fontFamily: FontFamily.Roboto_Light
    }
})