import { StyleSheet, Text, View, PixelRatio, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../Component/Header'
import color from '../../Utils/Color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomTextInput from '../../Component/CustomTextInput'
import PhoneInput from 'react-native-phone-number-input';
import FontFamily from '../../Utils/FontFamily';
import CustomButton from '../../Component/CustomButton';
import CustomAlert from '../../Component/CustomAlert';
import CustomBottomSheet from '../../Component/CustomBottomSheet'
import { Image } from 'react-native-animatable'
import apiCall from '../../Utils/apiCall'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import cacheData from '../../Storage/cacheData'
import AppConstants from '../../Storage/AppConstants'

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
        formattedValue: '',
        date: new Date()
    });
    const [message, setMessage] = useState('');
    const [checkTermCon, setCheckTermCon] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [alertVisible, setAlertVisible] = useState(false)
    const [isSucess, setIsSucess] = useState(false)

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
        getProfileData()
    }, [])

    const getProfileData = async () => {

        const token = await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token)
        const headers = {
            'authorization': token
        }

        apiCall.apiGETCall(AppConstants.AsyncKeyLiterals.getProfile, headers).then((response) => {

            setUserDetails({
                ...userDetails,
                firstName: response.firstName,
                lastName: response.lastName,
                profileImage: response.profileImage,
                address: response.address,
                city: response.city,
                zipcode: response.zipcode,
                province: response.province,
                country: response.country,
                countryCode: response.countryCode,
                phoneNumber: response.mobileNumber,
                date: moment(response.DOB).toDate()
            });

        })

    }
    const handleOnChangeText = (text) => {
        setUserDetails({
            ...userDetails,
            phoneNumber: text,
        });

    };

    const getImages = (item) => {
        console.log("item", item);
        setIsOpen(false)
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
        else if (!userDetails.formattedValue) {
            setMessage('Enter phone number');
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
        formData.append("DOB", userDetails.date)
        formData.append("city", userDetails.city)
        formData.append("province", userDetails.province)
        formData.append("zipcode", userDetails.zipcode)

        console.log(formData);
        const headers = {
            'authorization': await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.token),
            'Content-Type': 'multipart/form-data'
        }
        await apiCall.apiPOSTCall('/update-profile', formData, headers)
            .then(response => {
                // Handle success
                console.log(response);
            })
            .catch(error => {
                console.error('Axios Error:', error);
                // Handle error
            });

    }
    return (
        <View style={{ flex: 1, backgroundColor: color.white }}>
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
                                <MaterialIcons onPress={() => { setIsOpen(true) }} name='edit' color={color.black} style={{ position: 'absolute', right: 0, bottom: 0, zIndex: 2, fontSize: PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get()), backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()), padding: PixelRatio.getPixelSizeForLayoutSize(2 / PixelRatio.get()), marginRight: PixelRatio.getPixelSizeForLayoutSize(-5 / PixelRatio.get()) }} />
                                <Image source={{ uri: userDetails.profileImage.path ? userDetails.profileImage.path : AppConstants.AsyncKeyLiterals.Base_URL + '/' + userDetails.profileImage }} style={userDetails.profileImage.path ? [styles.imageStyle, { borderWidth: 0, resizeMode: 'contain' }] : [styles.imageStyle]} />
                            </View>
                            :

                            <TouchableOpacity activeOpacity={0.6} onPress={() => { setIsOpen(true) }} style={styles.imageStyle}>
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

                    <PhoneInput
                        value={userDetails.phoneNumber}
                        defaultValue={userDetails.phoneNumber}
                        defaultCode={userDetails.countryCode}
                        textContainerStyle={{
                            borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
                            backgroundColor: color.white,
                            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                        }}
                        layout="first"
                        onChangeText={(text) => handleOnChangeText(text)}
                        onEndEditing={() => handleOnEndEditing()}

                        onChangeFormattedText={(text) => setUserDetails({
                            ...userDetails,
                            formattedValue: text,
                        })}
                        onChangeCountry={(text) => setUserDetails({
                            ...userDetails,

                            countryCode: (text.cca2),
                        })}
                        withDarkTheme
                        withShadow
                        containerStyle={styles.phoneInputContainer}
                        textInputStyle={styles.phoneInputText}
                        codeTextStyle={styles.phoneInputCodeText}
                        flagButtonStyle={styles.phoneInputFlagButton}
                        codeContainerStyle={styles.phoneInputCodeContainer}
                        countryPickerButtonStyle={{ backgroundColor: color.white }}
                    />


                    <CustomTextInput
                        value={userDetails.address}
                        onChangeText={(i) => setUserDetails({
                            ...userDetails,
                            address: i,
                        })}
                        type={"Address"}
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


                    {/* Login btn */}
                    <CustomButton press={validatefunc} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()), }} text="Update" />
                </View>
                <CustomBottomSheet getCall="imageSelection" onClose={() => setIsOpen(false)} isOpen={isOpen} data={(item) => getImages(item)} />
                <CustomAlert isSucess={isSucess} visible={alertVisible} message={message} onClose={closeAlert} alert={"login"} />

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
