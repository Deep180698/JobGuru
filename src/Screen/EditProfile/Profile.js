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
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import cacheData from '../../Storage/cacheData'
import AppConstants from '../../Storage/AppConstants'
import PhoneNumberInput from '../../Component/PhoneNumberInput'
import { useSelector, useDispatch } from 'react-redux';
import { authFunc } from '../../Storage/Action'

import axios from 'axios'
import CustomRBottomSheet from '../../Component/CustomRBottomSheet'
import CustomNormalRBottomSheet from '../../Component/CustomNormalRBottomSheet'
import CustomLoader from '../../Component/CustomLoader'

const Profile = (props) => {
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        profileImage: '',
        address: '',
        city: '',
        email: '',
        zipcode: '',
        province: '',
        country: '',
        countryCode: '',
        phoneNumber: '',
        date: new Date()
    });
    const [message, setMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false)
    const [isSucess, setIsSucess] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const { authData } = useSelector((state) => state.reducer);
    const dispatch = useDispatch();
    const bottomSheetRef = useRef();

    const openBottomSheet = () => {

        bottomSheetRef.current.open();
    };
    const closeBottomSheet = () => {
        bottomSheetRef.current.close();
    };
    // const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || userDetails.date;
        setShowDatePicker(Platform.OS === 'ios'); // For iOS, close the picker after selection
        setUserDetails({
            ...userDetails,
            date: currentDate,
        });
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    useEffect(() => {

        getProfileData();
    }, [authData])


    const getProfileData = async () => {
        console.log(authData);
        setUserDetails({
            ...userDetails,
            firstName: authData.data.userData.firstName,
            lastName: authData.data.userData.lastName,
            profileImage: authData.data.userData.profileImage,
            address: authData.data.userData.address,
            city: authData.data.userData.city,
            zipcode: authData.data.userData.zipcode,
            province: authData.data.userData.province,
            country: authData.data.userData.country,
            countryCode: authData.data.userData.countryCode,
            phoneNumber: authData.data.userData.mobileNumber,
            date: moment(authData.data.userData.DOB).toDate()
        });

    }
    const getImages = (item) => {
        setUserDetails({
            ...userDetails,
            profileImage: item,
        });
        closeBottomSheet()
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
        else {

            fetchData()
        }

    };

    const fetchData = async () => {

        setIsVisible(true)
        const formData = new FormData();

        formData.append("firstName", userDetails.firstName)
        formData.append("lastName", userDetails.lastName)
        formData.append("countryCode", userDetails.countryCode)
        formData.append("mobileNumber", userDetails.phoneNumber)
        if (userDetails.profileImage?.path) {
            const pathSegments = userDetails.profileImage.path.split('/');

            const imageName = pathSegments[pathSegments.length - 1];
            formData.append('profileImage', {
                uri: userDetails.profileImage.path,
                type: userDetails.profileImage.mime,
                name: imageName,
            });
        } else {
            formData.append('profileImage', userDetails.profileImage);
        }

        formData.append("address", userDetails.address)
        formData.append("DOB", moment(userDetails.date).toISOString())
        formData.append("city", userDetails.city)
        formData.append("country", userDetails.country)
        formData.append("province", userDetails.province)
        formData.append("zipcode", userDetails.zipcode)

        console.log(formData);
        const headers = {
            accept: 'application/json',
            'content-type': 'multipart/form-data',
            'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
        }

        await axios({
            method: 'POST',
            url: AppConstants.AsyncKeyLiterals.Base_URL + AppConstants.AsyncKeyLiterals.update_profile,
            data: formData,
            headers: headers
        }).then(response => {

            console.log("responce Data ====> ",response);
            authData.data.userData = response.data.userData

            const asyncItem = AppConstants.AsyncKeyLiterals;

            cacheData.saveDataToCachedWithKey(asyncItem.IS_AUTH, authData);

            dispatch(authFunc(authData))
            setIsVisible(false)

        }).catch(() => {
            setIsVisible(false)

        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: color.white }}>
            <CustomLoader isVisible={isVisible} />
            <Header title={"Profile Details"} screenName={"normal"} onPress={() => props.navigation.goBack()} />
            <ScrollView>

                <View style={{
                    flexDirection: 'row', backgroundColor: color.white, marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                }}>
                    <View style={{
                        flex: 0.6,
                        backgroundColor: color.white,
                        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),

                    }}>
                        {userDetails.profileImage ?
                            <View>
                                <MaterialIcons onPress={() => openBottomSheet()} name='edit' color={color.black} style={{ position: 'absolute', right: 0, bottom: 0, zIndex: 2, fontSize: PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get()), backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()), padding: PixelRatio.getPixelSizeForLayoutSize(2 / PixelRatio.get()), marginRight: PixelRatio.getPixelSizeForLayoutSize(-5 / PixelRatio.get()) }} />
                                <Image source={{ uri: userDetails.profileImage.path ? userDetails.profileImage.path : AppConstants.AsyncKeyLiterals.Base_URL + '/' + userDetails.profileImage }} style={userDetails.profileImage.path ? [styles.imageStyle, { borderWidth: 0, resizeMode: 'contain' }] : [styles.imageStyle]} />
                            </View>
                            :

                            <TouchableOpacity activeOpacity={0.6} onPress={() => openBottomSheet()} style={styles.imageStyle}>
                                <AntDesign name='plus' color={color.black} size={PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get())} />
                            </TouchableOpacity>}
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 10, alignSelf: 'center', backgroundColor: color.white }}>
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

                    <PhoneNumberInput mobileNumber={(i) => {
                        setUserDetails({
                            ...userDetails,
                            phoneNumber: i,
                        })
                    }} countryCode={(i) => {
                        setUserDetails({
                            ...userDetails,
                            countryCode: i,
                        })
                    }} />
                    <CustomTextInput
                        value={userDetails.address}
                        onChangeText={(i) => setUserDetails({
                            ...userDetails,
                            address: i,
                        })}
                        type={"Address"}
                        placeholder={"Address"}
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
                        placeholder={"Province"}
                    />


                    <CustomTextInput
                        value={userDetails.country}
                        onChangeText={(i) => setUserDetails({
                            ...userDetails,
                            country: i,
                        })}
                        type={"whiteBc"}
                        placeholder={"Country"}
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


                    {/* Login btn */}
                    <CustomButton press={validatefunc} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()), }} text="Update" />
                </View>
                <CustomNormalRBottomSheet Height={120} refBottomSheet={bottomSheetRef} multiple={false} getCall="imageSelection" data={(item) => getImages(item)} />
                <CustomAlert isSucess={isSucess} visible={alertVisible} message={message} onClose={closeAlert} alert={"normal"} />

            </ScrollView>
        </View>
    )
}

export default Profile

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
        fontSize: 16,
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
        color: color.black,
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        fontSize: 12 / PixelRatio.getFontScale(),

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
        fontSize: 12 / PixelRatio.getFontScale(),
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
