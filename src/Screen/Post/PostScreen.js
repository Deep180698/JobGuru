import { PixelRatio, StyleSheet, ScrollView, Text, TouchableOpacity, View, FlatList, Dimensions, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'
const screenWidth = Dimensions.get('window').width;
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontFamily from '../../Utils/FontFamily'
import CustomTextInput from '../../Component/CustomTextInput'
import cacheData from '../../Storage/cacheData';
import AppConstants from '../../Storage/AppConstants';
import axios from 'axios';
import CustomRBottomSheet from '../../Component/CustomRBottomSheet';
import CustomNormalRBottomSheet from '../../Component/CustomNormalRBottomSheet';
import CustomAlert from '../../Component/CustomAlert';
import CustomLoader from '../../Component/CustomLoader';
import * as Animatable from 'react-native-animatable';
import CustomButton from '../../Component/CustomButton';
import CustomDropdownComponent from '../../Component/CustomDropdownComponent';
const data = [
    { label: 'Item 1', value: 'Full-Time' },
    { label: 'Item 2', value: 'part-Time' },
    { label: 'Item 3', value: 'Seasonal' },
    { label: 'Item 4', value: 'Contract' },
    { label: 'Item 5', value: 'Temporary' },
    { label: 'Item 6', value: 'Freelance' },
    { label: 'Item 7', value: 'Remote' },
    { label: 'Item 8', value: 'Internship' },
];


const PostScreen = (props) => {


    const [companyDetails, setCompanyDetails] = useState({
        companyName: 'Test',
        department: 'Test',
        addressline1: 'Test',
        addressline2: 'Test',
        country: 'Test',
        province: 'Test',
        city: 'Test',
        postalcode: 'Test',

    });
    const [userDetails, setUserDetails] = useState({
        firstName: 'Test',
        lastName: 'Test',
        profileImage: 'Test',
    });

    const [jobDetails, setJobDetails] = useState({
        title: 'Test',
        position: 'Test',
        description: 'Test',
        requirement: 'Test',
        salary: 'Test',
        additionalNote: 'Test',
        skills: '',
        texts: [], 
        type: '',
        jobTypeArray: []
    });



    const [state, setState] = useState({
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
    const [step, setStape] = useState(0)
    const [isNext, setIsNext] = useState(2)
    const [salaryType, setSalaryType] = useState('Yearly'); // Default value is 'Yearly'


    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        const data = await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.IS_AUTH)
        console.log(data);
        setUserDetails({
            ...userDetails,
            firstName: data?.data?.userData?.firstName,
            lastName: data?.data?.userData?.lastName,
            profileImage: data?.data?.userData?.profileImage,
        });
    }



    const createPost = async () => {

        if(step === 0){
            setStape(step + 1)
        }else{

            const formData = new FormData();

            // Add each part of the form data
            formData.append("companyDetails", JSON.stringify(companyDetails));
            formData.append("userDetails", JSON.stringify(userDetails));
            formData.append("jobDetails", JSON.stringify(jobDetails));
          
            // Make the POST request
            try {
              const response = await axios.post(
                AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.CreatPost, // Replace with your backend API endpoint
                formData, // FormData object containing the form data
                {
                  headers: {
                    'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),

                    'Content-Type': 'multipart/form-data', // Set the content type header
                    // Other headers if needed
                  },
                }
              );
          
              // Handle successful response
              props.navigation.replace('BottomNavigator')

              console.log('Response:', response.data);
              // Do something with the response if needed
            } catch (error) {
              // Handle error
              console.error('Error:', error);
              // Do something with the error if needed
            }

      
    }
    }

    const getCall = () => {
        jobDetails.texts.push(jobDetails.skills)
        setJobDetails({
            ...jobDetails,
            skills: ''
        })

    }
    const getJobTypeCall = () => {
        console.log(jobDetails.type);
        jobDetails.jobTypeArray.push(jobDetails.type)
        setJobDetails({
            ...jobDetails,
            type: ''
        })
    }

    const handleItemPress = (index) => {
        // Create a copy of the array
        const updatedTexts = [...jobDetails.texts];

        // Remove the item at the specified index
        updatedTexts.splice(index, 1);

        // Update the state with the new array
        setJobDetails({
            ...jobDetails,
            texts: updatedTexts
        })
    };
    const handleItemPress1 = (index) => {
        // Create a copy of the array
        const updatedTexts = [...jobDetails.jobTypeArray];

        // Remove the item at the specified index
        updatedTexts.splice(index, 1);

        // Update the state with the new array
        setJobDetails({
            ...jobDetails,
            jobTypeArray: updatedTexts
        })
    };


    const firstStep = () => {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                <View style={{ flex: 1 }}>
                    <Header screenName={"normal"} title={'Post'} onPress={() => props.navigation.goBack()} />

                    <Text style={[styles.textStyles, { fontSize: 18 / PixelRatio.getFontScale(), textAlign: 'center', marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), fontFamily: FontFamily.Roboto_Bold }]}>{'Company Details'}</Text>

                    {/* Company_Name */}
                    <CustomTextInput
                        value={companyDetails.companyName}
                        onChangeText={(i) => setCompanyDetails({
                            ...companyDetails,
                            companyName: i,
                        })}
                        type={"whiteBc"}
                        placeholder={"Company Name"}
                    />
                    {/* Department */}

                    <CustomTextInput
                        value={companyDetails.department}
                        onChangeText={(i) => setCompanyDetails({
                            ...companyDetails,
                            department: i,
                        })}
                        type={"whiteBc"}
                        placeholder={"Department"}
                    />
                    {/* Address */}

                    <View>
                        <CustomTextInput
                            value={companyDetails.addressline1}
                            onChangeText={(i) => setCompanyDetails({
                                ...companyDetails,
                                addressline1: i,
                            })}
                            type={"whiteBc"}
                            placeholder={"Address Line 1"}
                        />
                        <CustomTextInput
                            value={companyDetails.addressline2}
                            onChangeText={(i) => setCompanyDetails({
                                ...companyDetails,
                                addressline2: i,
                            })}
                            type={"whiteBc"}
                            placeholder={"Address Line 2 (Optional)"}
                        />
                        <CustomTextInput
                            value={companyDetails.country}
                            onChangeText={(i) => setCompanyDetails({
                                ...companyDetails,
                                country: i,
                            })}
                            type={"whiteBc"}
                            placeholder={"Country"}
                        />
                        <CustomTextInput
                            value={companyDetails.province}
                            onChangeText={(i) => setCompanyDetails({
                                ...companyDetails,
                                province: i,
                            })}
                            type={"whiteBc"}
                            placeholder={"Province"}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '48%' }}>
                                <CustomTextInput
                                    value={companyDetails.city}
                                    onChangeText={(i) => setCompanyDetails({
                                        ...companyDetails,
                                        province: i,
                                    })}
                                    type={"whiteBc"}
                                    placeholder={"City"}

                                />

                            </View>
                            <View style={{ width: '48%' }}>

                                <CustomTextInput
                                    value={companyDetails.postalcode}
                                    onChangeText={(i) => setCompanyDetails({
                                        ...companyDetails,
                                        postalcode: i,
                                    })}
                                    type={"whiteBc"}
                                    placeholder={"Postal Code"}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
    const secondStep = () => {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                <View style={{ flex: 1 }}>
                    <Header screenName={"normal"} title={'Post'} onPress={() => setStape(step - 1)} />

                    <Text style={[styles.textStyles, { fontSize: 18 / PixelRatio.getFontScale(), textAlign: 'center', marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), fontFamily: FontFamily.Roboto_Bold }]}>{'Job Details'}</Text>
                    {/* Position */}
                    <CustomTextInput
                        value={jobDetails.title}
                        onChangeText={(i) => setJobDetails({
                            ...jobDetails,
                            title: i,
                        })}
                        type={"whiteBc"}
                        placeholder={"Position"}
                    />
                    {/* Description  */}
                    <CustomTextInput
                        value={jobDetails.description}
                        onChangeText={(i) => setJobDetails({
                            ...jobDetails,
                            description: i,
                        })}
                        type={"Address"}
                        placeholder={"Description"}
                    />
                    {/* Requirement  */}
                    <CustomTextInput
                        value={jobDetails.requirement}
                        onChangeText={(i) => setJobDetails({
                            ...jobDetails,
                            requirement: i,
                        })}
                        type={"Address"}
                        placeholder={"Requirement"}
                    />

                    <View>
                        <View style={{ justifyContent: 'center' }}>
                            <CustomTextInput
                                value={jobDetails.salary}
                                onChangeText={(i) => setJobDetails({
                                    ...jobDetails,
                                    salary: i,
                                })}
                                type={"whiteBc"}
                                placeholder={"Salary"}
                            />
                            <TouchableOpacity onPress={() => setSalaryType(salaryType === 'Yearly' ? 'Hourly' : 'Yearly')} style={{ position: 'absolute', right: 10 }}>
                                <Text style={{ color: 'black' }}>{`| ${salaryType === 'Yearly' ? 'Hourly' : 'Yearly'}`}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Addition note */}
                        <CustomTextInput
                            value={jobDetails.additionalNote}
                            onChangeText={(i) => setJobDetails({
                                ...jobDetails,
                                additionalNote: i,
                            })}
                            type={"Address"}
                            placeholder={"Additional Note (Optional)"}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                        <View style={{
                            flex: 1, marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                        }}>
                            <CustomDropdownComponent data={data} placeholder={'Select Job Type'} selectedValue={(i) => [
                                setJobDetails({
                                    ...jobDetails,
                                    type: i,
                                })]} />

                        </View>
                        {jobDetails.skills !== ''}{
                            <TouchableOpacity
                                onPress={() => getJobTypeCall()}
                                style={{
                                    backgroundColor: color.primerycolor,
                                    marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                                    padding: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
                                    borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
                                }}>
                                <Text style={[styles.textStyles, { color: color.white }]}>{'Add'}</Text>
                            </TouchableOpacity>
                        }

                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                        {jobDetails.jobTypeArray.map((item, index) => (
                            <View>
                                <View style={styles.item}>
                                    <Text style={[styles.textStyles, { color: color.white }]}>{item}</Text>
                                </View>
                                <TouchableOpacity activeOpacity={0.6} onPress={() => handleItemPress1(index)} style={{ position: 'absolute', right: 0, top: 0, zIndex: 2, backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }} >
                                    <AntDesign name='closecircle' color={color.red} size={PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get())} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    {/* Skills */}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <CustomTextInput
                                value={jobDetails.skills}
                                onChangeText={(i) => [setJobDetails({
                                    ...jobDetails,
                                    skills: i,
                                })]}
                                type={"whiteBc"}
                                placeholder={"Add Skills"}
                            />
                        </View>

                        {jobDetails.skills !== ''}{
                            <TouchableOpacity
                                onPress={() => getCall()}
                                style={{
                                    backgroundColor: color.primerycolor,
                                    marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                                    padding: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
                                    borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
                                }}>
                                <Text style={[styles.textStyles, { color: color.white }]}>{'Add'}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
                        {jobDetails.texts.map((item, index) => (
                            <View>
                                <View style={styles.item}>
                                    <Text style={[styles.textStyles, { color: color.white }]}>{item}</Text>
                                </View>
                                <TouchableOpacity activeOpacity={0.6} onPress={() => handleItemPress(index)} style={{ position: 'absolute', right: 0, top: 0, zIndex: 2, backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }} >
                                    <AntDesign name='closecircle' color={color.red} size={PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get())} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        )
    }
   
    return (
        <View style={styles.container}>
            <CustomLoader isVisible={isVisible} />
            <View style={{ flex: 1 }}>
                {step === 0 ? firstStep() : null}
                {step === 1 ? secondStep() : null}



            </View>

            {/* Create Post */}
            <View>
                {step === 0 ?
                    <CustomButton
                        onPress={createPost}
                        text={'Next'}
                        backgroundColor={color.primerycolor}
                        textColor={color.white}
                        btnStyle={{ marginVertical: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }}
                    />

                    : null}
                {step !== 0 && step !== 1 ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CustomButton
                            onPress={() => { setStape(step - 1) }}
                            text={'Back'}
                            backgroundColor={color.primerycolor}
                            textColor={color.white}
                            btnStyle={{ width: '48%', marginVertical: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }}
                        />
                        <CustomButton
                            onPress={() => { setStape(step + 1) }}
                            text={'Next'}
                            backgroundColor={color.primerycolor}
                            textColor={color.white}
                            btnStyle={{ width: '48%', marginVertical: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }}
                        />
                    </View>
                    : null}

                {step === 1 ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CustomButton
                            onPress={() => { setStape(step - 1) }}
                            text={'Back'}
                            backgroundColor={color.primerycolor}
                            textColor={color.white}
                            btnStyle={{ width: '48%', marginVertical: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }}
                        />
                        <CustomButton
                            onPress={createPost}
                            text={'create'}
                            backgroundColor={color.primerycolor}
                            textColor={color.white}
                            btnStyle={{ width: '48%', marginVertical: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }}
                        />
                    </View>

                    : null}

            </View>
            {/* <CustomRBottomSheet multiple={state.multiple} getCall={state.type} refBottomSheet={bottomSheetRef} data={(item) => getCall(item)} /> */}
            <CustomAlert onClose={() => setState({ ...state, isAlert: false })} visible={state.isAlert} alert={'normal'} message={state.message} />

        </View>
    )
}


export default PostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
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
        fontFamily: FontFamily.Roboto_Regular,

    },
    profileStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(80 / PixelRatio.get()),
        width: PixelRatio.getPixelSizeForLayoutSize(80 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()),
        resizeMode: "contain",
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
        backgroundColor: color.primerycolor,
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
    }

})