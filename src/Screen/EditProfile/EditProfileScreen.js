import { StyleSheet, Text, View, Dimensions, PixelRatio, TextInput, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'
import JSONList from '../../JSON/JSONList'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomButton from '../../Component/CustomButton'
import { TouchableOpacity } from 'react-native'
import CustomBottomSheet from '../../Component/CustomBottomSheet'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontFamily from '../../Utils/FontFamily'
const { height, width } = Dimensions.get('window');

const EditProfileScreen = (props) => {

    const [imageUrl, setImageUrl] = useState('')
    const [isOpen, setIsOpen] = useState(false)


    const [firstName, setFirstName] = useState('')
    const [mobileNumber, setmobileNumber] = useState('')
    const [lasttName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [province, setProvince] = useState('')
    const [country, setCountry] = useState('')



    useEffect(() => {

    }, [])

    const validatefunc = () => {

        if (!firstName) {
            setMessage('Enter first name');
            showAlert()
            return;
        }
        else if (!lasttName) {
            setMessage('Enter last name');
            showAlert()
            return;
        }

        else {
            setMessage(`Sign up Successfull..Let's go for the login!!`);
            setIsSucess(true)
            showAlert()

        }

    };


    return (
        <View style={styles.container}>
            {/* Header */}
            <Header screenName={"EditProfile"} onPress={() => props.navigation.goBack()} />
            {/* body */}

            <ScrollView style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>

                <TouchableOpacity activeOpacity={0.6} onPress={() => setIsOpen(true)} style={{ alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }}>
                    <Image source={{ uri: imageUrl ? '' : 'https://cdn-icons-png.flaticon.com/128/9347/9347568.png?track=ais' }} style={styles.profilePic} />
                </TouchableOpacity>

                <View style={{
                    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
                    paddingBottom: PixelRatio.getPixelSizeForLayoutSize(40 / PixelRatio.get()),
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>

                    <View style={{
                        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
                        marginTop: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),

                    }}>

                        {/* First name and Last name */}
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.textStyles, { flex: 1 }]}>{"First Name"}</Text>
                            <Text style={[styles.textStyles, { flex: 1 }]}>{"Last Name"}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <TextInput
                                value={firstName}
                                onChangeText={(i) => setFirstName(i)}
                                placeholder='First Name'
                                style={{ flex: 1, color: color.black, backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}

                            />
                            <TextInput
                                value={lasttName}
                                onChangeText={(i) => setLastName(i)}
                                placeholder='Last Name'
                                style={{ flex: 1, color: color.black, backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}

                            />
                        </View>
                        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyles, {}]}>{"Mobile Number"}</Text>
                            <TextInput
                                value={mobileNumber}
                                onChangeText={(i) => setmobileNumber(i)}
                                placeholder='Mobile Number'
                                style={{ color: color.black, backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}

                            />
                        </View>
                        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyles, {}]}>{"Address"}</Text>
                            <TextInput
                                value={address}
                                onChangeText={(i) => setAddress(i)}
                                placeholder='Address'
                                style={{ color: color.black, backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}

                            />
                        </View>

                        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyles, {}]}>{"City"}</Text>
                            <TextInput
                                value={city}
                                onChangeText={(i) => setCity(i)}
                                placeholder='city'
                                style={{ color: color.black, backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}

                            />
                        </View>
                        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyles, {}]}>{"Province"}</Text>
                            <TextInput
                                value={province}
                                onChangeText={(i) => setProvince(i)}
                                placeholder='Province'
                                style={{ color: color.black, backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}

                            />
                        </View>
                        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyles, {}]}>{"Country"}</Text>
                            <TextInput
                                value={country}
                                onChangeText={(i) => setCountry(i)}
                                placeholder='Country'
                                style={{ color: color.black, backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}

                            />
                        </View>
                        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }}>
                            <Text style={[styles.textStyles, {}]}>Zip Code</Text>
                            <TextInput
                                value={zipcode}
                                onChangeText={(i) => setZipcode(i)}
                                placeholder='Zip code'
                                style={{
                                    color: color.black,
                                    backgroundColor: color.white,
                                    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                                    marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                                    marginRight: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                                }}

                            />
                        </View>
                        <CustomButton press={validatefunc} textStyle={{ color: color.black }} style={{ alignSelf: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()), backgroundColor: color.white }} text="Submit" />
                    </View>
                </View>
            </ScrollView>
            <CustomBottomSheet getCall="imageSelection" onClose={() => setIsOpen(false)} isOpen={isOpen} />

        </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.black
    },

    profilePic: {

        height: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
        width: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(200 / PixelRatio.get()),
        resizeMode: "contain"
    },
    btnStyles: {
        backgroundColor: color.white,
        padding: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
    },
    textStyles: {
        color: color.white,
        fontSize: 16 / PixelRatio.getFontScale(),
        fontFamily:FontFamily.Roboto_Light

    }
})