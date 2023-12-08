import { StyleSheet, Text, View, PixelRatio, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../Component/Header'
import color from '../../Utils/Color'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomTextInput from '../../Component/CustomTextInput'
import PhoneInput from 'react-native-phone-number-input';
import { Checkbox } from 'react-native-paper';
import FontFamily from '../../Utils/FontFamily';
import CustomButton from '../../Component/CustomButton';
import CustomAlert from '../../Component/CustomAlert';
import CustomBottomSheet from '../../Component/CustomBottomSheet'
import { Image } from 'react-native-animatable'
import apiCall from '../../Utils/apiCall'
const UserDetails = (props) => {
    const { firstName, lastName, email, password } = props.route.params
    const [firstName1, setFirstName] = useState(firstName)
    const [lastName1, setLastName] = useState(lastName)

    const [profileImage, setProfileImage] = useState('')
    const [address, setAddress] = useState('Test')
    const [city, setCity] = useState('Test')
    const [zipcode, setZipcode] = useState('Test')
    const [province, setProvince] = useState('Test')
    const [country, setCountry] = useState('Test')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('9898779788');
    const [formattedValue, setFormattedValue] = useState('');
    const [message, setMessage] = useState('');
    const [checkTermCon, setCheckTermCon] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [alertVisible, setAlertVisible] = useState(false)
    const [isSucess, setIsSucess] = useState(false)
    useEffect(() => {

        console.log(firstName);

    }, [])

    const handleOnChangeText = (text) => {
        setPhoneNumber(text);
    };
    
    const getImages = (item) => {
        console.log("item", item);
        setIsOpen(false)
        setProfileImage(item.path)
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

    const validatefunc =async () => {
        console.log("2333",formattedValue);

        if (!firstName1) {
            setMessage('Enter first name');
            showAlert()
            return;
        }
        else if (!lastName1) {
            setMessage('Enter last name');
            showAlert()
            return;
        }
        else if (!formattedValue) {
            setMessage('Enter phone number');
            showAlert()
            return;
        }
        else if (!address) {
            setMessage('Enter Addrees');
            showAlert()
            return;
        }
        else if (!city) {
            setMessage('Enter City');
            showAlert()
            return;
        }
        else if (!province) {
            setMessage('Enter Province');
            showAlert()
            return;
        }

        else if (!country) {
            setMessage('Enter country');
            showAlert()
            return;
        }
        else if (!zipcode) {
            setMessage('Enter zipcode');
            showAlert()
            return;
        }

        else if (!checkTermCon) {
            setMessage('Please check terms and condition!!');
            showAlert()
            return;
        }
        else {
            console.log("2222");

            fetchData()
        }

     

        // setMessage(result.message);

        // props.navigation.navigate("UserDetails")
    };

    const fetchData =async()=>{

        const formData = new FormData();

        formData.append("firstName",firstName1)
        formData.append("lastName",lastName1)
        formData.append("email",email)
        formData.append("password",password)
        formData.append("mobileNumber",mobileNumber)
        formData.append("profileImage",profileImage)
        formData.append("address",address)
        formData.append("city",city)
        formData.append("province",province)
        formData.append("checked",checked)
        formData.append("zipcode",zipcode)
        // const data = {
        //     "firstName": firstName1,
        //     "lastName": lastName1,
        //     "email": email,
        //     "password": password,
        //     "mobileNumber":formattedValue,
        //     "profileImage":profileImage,
        //     "address":address,
        //     "city":city,
        //     "zipcode":zipcode,
        //     "province":province,
        //     "checked":checkTermCon

        // }

        const Header = {
            'Content-Type': 'application/json',
        }
        const result = await apiCall.apiPOSTCall('/signUp', data, Header);

        console.log(result);
    }
    return (
        <View style={{ flex: 1, backgroundColor: color.black }}>
            <ScrollView>
                <Header title={"User Details"} screenName={"SignUp"} onPress={() => props.navigation.goBack()} />

                <View style={{ flexDirection: 'row', backgroundColor: color.white }}>
                    <View style={{
                        flex: 0.6,
                        backgroundColor: color.white,
                        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),

                    }}>
                        <Text style={[styles.textStyles, { marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), fontSize: 16 / PixelRatio.getFontScale(), color: color.black }]}>{"Profile"}</Text>
                        {profileImage ?
                            <Image source={{ uri: profileImage }} style={profileImage ? [styles.imageStyle, { borderWidth: 0, resizeMode: 'contain' }] : [styles.imageStyle]} />
                            :
                            <TouchableOpacity activeOpacity={0.6} onPress={() => { setIsOpen(true) }} style={styles.imageStyle}>
                                <AntDesign name='plus' color={color.black} size={PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get())} />
                            </TouchableOpacity>}
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 10, alignSelf: 'center', backgroundColor: color.white, marginTop: PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get()), }}>
                        <CustomTextInput
                            value={firstName}
                            onChangeText={(i) => setFirstName(i)}
                            type={"normal"}
                            placeholder={"First Name"}
                        />
                        <CustomTextInput
                            value={lastName}
                            onChangeText={(i) => setLastName(i)}
                            type={"normal"}
                            placeholder={"Last Name"}
                        />
                    </View>
                </View>

                <View style={{ backgroundColor: color.white, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), paddingBottom: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                    <PhoneInput
                        value={phoneNumber}
                        defaultValue={phoneNumber}
                        defaultCode="US"
                        textContainerStyle={{
                            borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
                            backgroundColor: color.golden,
                            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                        }}
                        layout="first"
                        onChangeText={(text) => handleOnChangeText(text)}
                        onEndEditing={() => handleOnEndEditing()}
                        onChangeFormattedText={(text) => setFormattedValue(text)}
                        withDarkTheme
                        withShadow
                        containerStyle={styles.phoneInputContainer}
                        textInputStyle={styles.phoneInputText}
                        codeTextStyle={styles.phoneInputCodeText}
                        flagButtonStyle={styles.phoneInputFlagButton}
                        codeContainerStyle={styles.phoneInputCodeContainer}

                    />

                    <CustomTextInput
                        value={address}
                        onChangeText={(i) => setAddress(i)}
                        type={"Address"}
                        placeholder={"Address"}
                    />
                    <CustomTextInput
                        value={city}
                        onChangeText={(i) => setCity(i)}
                        type={"normal"}
                        placeholder={"City"}
                    />
                    <CustomTextInput
                        value={province}
                        onChangeText={(i) => setProvince(i)}
                        type={"normal"}
                        placeholder={"Province"}
                    />


                    <CustomTextInput
                        value={country}
                        onChangeText={(i) => setCountry(i)}
                        type={"normal"}
                        placeholder={"Country"}
                    />
                    <CustomTextInput
                        value={zipcode}
                        onChangeText={(i) => setZipcode(i)}
                        type={"normal"}
                        placeholder={"Zip-Code"}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                        <Checkbox onPress={() => setCheckTermCon(!checkTermCon)} color={color.golden} status={checkTermCon ? 'checked' : 'unchecked'} />
                        <Text style={[styles.textStyles, { marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"I agree to the "}<Text style={{ textDecorationLine: 'underline', fontFamily: FontFamily.Roboto_Bold }}>{"terms and condition"}</Text></Text>
                    </View>

                    {/* Login btn */}
                    <CustomButton press={validatefunc} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }} text="SignUp" />
                </View>
                <CustomBottomSheet getCall="imageSelection" onClose={() => setIsOpen(false)} isOpen={isOpen} data={(item) => getImages(item)} />
                <CustomAlert isSucess={isSucess} visible={alertVisible} message={message} onClose={closeAlert} alert={"login"} />

            </ScrollView>
        </View>
    )
}

export default UserDetails

const styles = StyleSheet.create({
    phoneInputContainer: {
        marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        backgroundColor: color.golden,
        padding: PixelRatio.getPixelSizeForLayoutSize(0 / PixelRatio.get()),
        width: "100%",
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),

    },
    phoneInputText: {
        fontSize: 16,
        backgroundColor: color.golden,
        padding: PixelRatio.getPixelSizeForLayoutSize(0 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),


    },
    phoneInputCodeText: {
        fontSize: 16 / PixelRatio.getFontScale(),
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(-15 / PixelRatio.get())
    },
    phoneInputFlagButton: {

    },
    phoneInputCodeContainer: {
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
    }
})