import { StyleSheet, Text, View, PixelRatio, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Header from '../../Component/Header'
import color from '../../Utils/Color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomTextInput from '../../Component/CustomTextInput'
import FontFamily from '../../Utils/FontFamily';
import CustomButton from '../../Component/CustomButton';
import CustomAlert from '../../Component/CustomAlert';
import { Image } from 'react-native-animatable'
import apiCall from '../../Utils/apiCall'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import AppConstants from '../../Storage/AppConstants'
import { Checkbox } from 'react-native-paper'
import PhoneNumberInput from '../../Component/PhoneNumberInput'
import { useSelector } from 'react-redux';
import CustomRBottomSheet from '../../Component/CustomRBottomSheet'
import CustomNormalRBottomSheet from '../../Component/CustomNormalRBottomSheet'
import cacheData from '../../Storage/cacheData'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authFunc } from '../../Storage/Action'

const UserDetails = (props) => {
    const { email, password } = props.route.params

    const dispatch = useDispatch();

    const [userDetails, setUserDetails] = useState({
        firstName: props.route.params.firstName,
        lastName: props.route.params.lastName,
        profileImage: '',
        address: '',
        city: '',
        email: '',
        zipcode: '',
        province: '',
        country: '',
        countryCode: '',
        phoneNumber: '',
        date: new Date(),
        checkTermCon: false
    });
    const [message, setMessage] = useState('');
  
    const [alertVisible, setAlertVisible] = useState(false)
    const [isSucess, setIsSucess] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false);
    const bottomSheetRef = useRef();

    const openBottomSheet = () => {

        bottomSheetRef.current.open();
    };
    const closeBottomSheet = () => {

        bottomSheetRef.current.close();
    };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || userDetails.date;
        setShowDatePicker(Platform.OS === 'ios'); // For iOS, close the picker after selection
        setUserDetails({
            ...userDetails,
            date: currentDate,
        });
    };

    const countryCode1 = useSelector((state) => state.reducer.countryCode);


    useEffect(() => {
        setUserDetails({
            ...userDetails,
            countryCode: countryCode1?.dial_code || '',
        });
    }, [countryCode1])
    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    const getImages = (item) => {
        setUserDetails({
            ...userDetails,

            profileImage: item,
        });
    }
    const closeAlert = () => {
        if (isSucess) {
            setAlertVisible(false)
        } else {
            setAlertVisible(false);

        }
    };
    const showAlert = () => {
        setAlertVisible(true);
    };

    const validatefunc = async () => {
        console.log("2333", userDetails);

        if (!userDetails.firstName) {
            setMessage('Enter first name');
            showAlert()
            return;
        }
        else if (!userDetails.lastName) {
            setMessage('Enter last name');
            showAlert()
            return;
        }

        else if (!userDetails.address) {
            setMessage('Enter Addrees');
            showAlert()
            return;
        }
        else if (!userDetails.countryCode) {
            setMessage('Select country code');
            showAlert()
            return;
        }
        else if (!userDetails.phoneNumber) {
            setMessage('Enter phoneNumber');
            showAlert()
            return;
        }
        else if (!userDetails.city) {
            setMessage('Enter City');
            showAlert()
            return;
        }
        else if (!userDetails.province) {
            setMessage('Enter province');
            showAlert()
            return;
        }

        else if (!userDetails.country) {
            setMessage('Enter country');
            showAlert()
            return;
        }
        else if (!userDetails.zipcode) {
            setMessage('Enter zipcode');
            showAlert()
            return;
        }
        else if (!userDetails.checkTermCon) {
            setMessage('Checked terms & condition');
            showAlert()
            return;
        }
        else {
            fetchData()
        }

    };

    const fetchData = async () => {
        const pathSegments = userDetails.profileImage.path.split('/');

        const imageName = pathSegments[pathSegments.length - 1];

        const formData = new FormData();

        formData.append("firstName", userDetails.firstName)
        formData.append("lastName", userDetails.lastName)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("countryCode", userDetails.countryCode)
        formData.append("mobileNumber", JSON.parse(userDetails.phoneNumber))
        formData.append('profileImage', {
            uri: userDetails.profileImage.path,
            type: userDetails.profileImage.mime,
            name: imageName,
        });

        formData.append("address", userDetails.address)
        formData.append("DOB", (userDetails.date).toISOString())
        formData.append("city", userDetails.city)
        formData.append("country", userDetails.country)
        formData.append("province", userDetails.province)
        formData.append("zipcode", userDetails.zipcode)
        formData.append("checked", userDetails.checkTermCon)

        const headers = {
            accept: 'application/json',
            'content-type': 'multipart/form-data'
        }
        console.log(formData);
        // await apiCall.apiPOSTCall('/signup', formData, headers)
        //     .then(response => {
        //         // Handle success
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.error('Axios Error:', error);
        //         // Handle error
        //     });
        await axios({
            method: 'POST',
            url: AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.signup,
            data: formData,
            headers: headers
        }).then(response => {
            if (response.status === 200) {


                dispatch(authFunc(response.data))

                const asyncItem = AppConstants.AsyncKeyLiterals;
                cacheData.saveDataToCachedWithKey(asyncItem.isLoggedIn, true);
                cacheData.saveDataToCachedWithKey(asyncItem.IS_AUTH, response.data);
                cacheData.token(asyncItem.token, response.data.token);

                props.navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: "BottomNavigator",
                        },
                    ],
                });
            }

        }).catch(error => {
            if (error.response.status === 401) {
                setMessage(error.response.data.error)
                setAlertVisible(true)
            } else {
                setMessage(error.message)
                setAlertVisible(true)
            }
        });
    }
    return (
        <View style={{ flex: 1, backgroundColor: color.black }}>
            <ScrollView>
                <Header title={"Profile Details"} screenName={"normal"} onPress={() => props.navigation.goBack()} />

                <View style={{ flexDirection: 'row', backgroundColor: color.white }}>
                    <View style={{
                        flex: 0.6,
                        backgroundColor: color.white,
                        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),

                    }}>
                        <Text style={[styles.textStyles, { marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), fontSize: 16 / PixelRatio.getFontScale(), color: color.black }]}>{"Profile"}</Text>
                        {userDetails.profileImage ?
                            <View>
                                <MaterialIcons onPress={() => { openBottomSheet() }} name='edit' color={color.black} style={{ position: 'absolute', right: 0, bottom: 0, zIndex: 2, fontSize: PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get()), backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()), padding: PixelRatio.getPixelSizeForLayoutSize(2 / PixelRatio.get()), marginRight: PixelRatio.getPixelSizeForLayoutSize(-5 / PixelRatio.get()) }} />
                                <Image source={{ uri: userDetails.profileImage.path ? userDetails.profileImage.path : AppConstants.AsyncKeyLiterals.Base_URL + '/' + userDetails.profileImage }} style={userDetails.profileImage.path ? [styles.imageStyle, { borderWidth: 0, resizeMode: 'contain' }] : [styles.imageStyle]} />
                            </View>
                            :

                            <TouchableOpacity activeOpacity={0.6} onPress={() => { openBottomSheet() }} style={styles.imageStyle}>
                                <AntDesign name='plus' color={color.black} size={PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get())} />
                            </TouchableOpacity>}
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 10, alignSelf: 'center', backgroundColor: color.white, marginTop: PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get()), }}>
                        <View style={{ flex: 1 }}>
                            <CustomTextInput
                                value={userDetails.firstName}
                                onChangeText={(i) => setUserDetails({
                                    ...userDetails,
                                    firstName: i,
                                })}
                                type={"firstName"}
                                placeholder={"First Name"}
                            />
                        </View>
                        <CustomTextInput
                            value={userDetails.lastName}
                            onChangeText={(i) => setUserDetails({
                                ...userDetails,
                                lastName: i,
                            })}
                            type={"firstName"}
                            placeholder={"Last Name"}
                        />
                    </View>
                </View>

                <View style={{ backgroundColor: color.white, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), paddingBottom: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>

                    <PhoneNumberInput countryCode={(i) => setUserDetails({
                        ...userDetails,
                        countryCode: i,
                    })} mobileNumber={(i) => setUserDetails({
                        ...userDetails,
                        phoneNumber: i,
                    })} />


                    <CustomTextInput
                        value={userDetails.address}
                        onChangeText={(i) => setUserDetails({
                            ...userDetails,
                            address: i,
                        })}
                        type={"whiteBc"}
                        placeholder={"address"}
                    />

                    <CustomTextInput
                        value={userDetails.city}
                        onChangeText={(i) => setUserDetails({
                            ...userDetails,
                            city: i,
                        })}
                        type={"whiteBc"}
                        placeholder={"City"}
                    />

                    <CustomTextInput
                        value={userDetails.province}
                        onChangeText={(i) => setUserDetails({
                            ...userDetails,
                            province: i,
                        })}
                        type={"whiteBc"}
                        placeholder={"province"}
                    />


                    <CustomTextInput
                        value={userDetails.country}
                        onChangeText={(i) => setUserDetails({
                            ...userDetails,
                            country: i,
                        })}
                        type={"whiteBc"}
                        placeholder={"country"}
                    />


                    <View style={{ justifyContent: 'center' }}>


                        <CustomTextInput
                            value={moment(userDetails.date).format('YYYY-MM-DD')}
                            onChangeText={(i) => setUserDetails({
                                ...userDetails,
                                country: i,
                            })}
                            type={"whiteBc"}
                            placeholder={"Date of birth"}
                        />
                        <FontAwesome name='calendar-o' onPress={showDatepicker} style={{ position: 'absolute', right: 10 }} color={color.black} size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} />

                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={userDetails.date}
                            mode="date" // You can change this to 'time' or 'datetime'
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            maximumDate={new Date()}
                        />
                    )}

                    <CustomTextInput
                        value={userDetails.zipcode}
                        onChangeText={(i) => setUserDetails({
                            ...userDetails,
                            zipcode: i,
                        })}
                        type={"whiteBc"}
                        placeholder={"Zip-Code"}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                        <Checkbox onPress={() => setUserDetails({ ...userDetails, checkTermCon: !userDetails.checkTermCon })} color={color.golden} status={userDetails.checkTermCon ? 'checked' : 'unchecked'} />
                        <Text style={[styles.textStyles, { marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"I agree to the "}<Text style={{ textDecorationLine: 'underline', fontFamily: FontFamily.Roboto_Bold }}>{"terms and condition"}</Text></Text>
                    </View>
                    {/* Login btn */}
                    <CustomButton press={validatefunc} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()), }} text="Sign Up" />
                </View>
                <CustomNormalRBottomSheet Height={120} onClose={closeBottomSheet} refBottomSheet={bottomSheetRef} multiple={false} getCall="imageSelection" data={(item) => getImages(item)} />
                <CustomAlert isSucess={isSucess} visible={alertVisible} message={message} onClose={closeAlert} alert={"normal"} />

            </ScrollView>
        </View>
    )
}

export default UserDetails

const styles = StyleSheet.create({
    phoneInputContainer: {
        borderWidth: 1,
        borderColor: color.black,
        marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        backgroundColor: color.white,
        padding: PixelRatio.getPixelSizeForLayoutSize(1 / PixelRatio.get()),
        width: "100%",
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        color: color.black,
        elevation: 0
    },
    phoneInputText: {
        fontSize: 12 / PixelRatio.getFontScale(),
        backgroundColor: color.white,
        padding: PixelRatio.getPixelSizeForLayoutSize(0 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        color: color.black

    },
    phoneInputCodeText: {
        fontSize: 12 / PixelRatio.getFontScale(),
        color: color.black

    },
    phoneInputFlagButton: {
        color: color.black,

    },
    phoneInputCodeContainer: {
        fontSize: 12 / PixelRatio.getFontScale(),
        color: color.black,
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),

    },
    imageStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(120 / PixelRatio.get()),
        borderWidth: PixelRatio.getPixelSizeForLayoutSize(1 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderColor: color.black,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain'
    },
    textStyles: {
        color: color.black,
        fontFamily: FontFamily.Roboto_Regular,
        fontSize: 12 / PixelRatio.getFontScale()
    },
    btnStyle: {
        backgroundColor: color.white,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: color.black
    }
})