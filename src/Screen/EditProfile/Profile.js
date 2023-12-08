import { Image, PixelRatio, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import color from '../../Utils/Color'
import FontFamily from '../../Utils/FontFamily'
import Header from '../../Component/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomButton from '../../Component/CustomButton'
import { TextInput } from 'react-native-paper'
const Profile = (props) => {
  const [isOpen, setIsOpen] = useState(false)


  const [firstName, setFirstName] = useState('')
  const [mobileNumber, setmobileNumber] = useState('')
  const [lasttName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [province, setProvince] = useState('')
  const [country, setCountry] = useState('')

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
      <Header screenName={"Profile"} onPress={() => { }} />
      <ScrollView style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
        }}>
          <Text style={[styles.textStyles, { fontSize: 25 / PixelRatio.getFontScale(), fontFamily: FontFamily.Roboto_Bold }]}>{"Hey Emily !"}</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={() => setIsOpen(true)}>
            <MaterialIcons name='edit' style={{ position: 'absolute', right: 0, top: 0, backgroundColor: color.black, padding: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()), borderRadius: 100, zIndex: 2 }} color={color.white} size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} />
            <Image style={styles.imageStyle} source={{ uri: 'https://img.freepik.com/free-photo/friendly-smiling-woman-looking-pleased-front_176420-20779.jpg' }} />
          </TouchableOpacity>
        </View>

        <View style={{
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
            marginTop: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
            marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
          }}>



            <TextInput
              value={firstName}
              onChangeText={(i) => setFirstName(i)}
              label='First Name'
              mode='flat'
              style={[styles.textInputStyle]}
              placeholderTextColor={color.black}
            />
            <TextInput
              value={lasttName}
              onChangeText={(i) => setLastName(i)}
              label='Last Name'
              style={[styles.textInputStyle]}
            />
            <TextInput
              value={mobileNumber}
              onChangeText={(i) => setmobileNumber(i)}
              label='Mobile Number'
              style={styles.textInputStyle}
            />

            <TextInput
              value={address}
              onChangeText={(i) => setAddress(i)}
              label='Street'
              style={styles.textInputStyle}
            />


            <TextInput
              value={city}
              onChangeText={(i) => setCity(i)}
              label='City'
              style={styles.textInputStyle}
            />

            <TextInput
              value={province}
              onChangeText={(i) => setProvince(i)}
              label='Province'
              style={styles.textInputStyle}
            />

            <TextInput
              value={country}
              onChangeText={(i) => setCountry(i)}
              label={"Country"}
              style={styles.textInputStyle}
            />

            <TextInput
              value={zipcode}
              onChangeText={(i) => setZipcode(i)}
              label={"Zip-Code"}
              style={styles.textInputStyle}
            />
          </View>
          <CustomButton press={validatefunc} textStyle={{ color: color.black }} style={{
            backgroundColor: color.white,
            marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
            marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
          }} text="Save" />
        </View>


      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.black
  },
  textStyles: {
    fontSize: 14 / PixelRatio.getFontScale(),
    color: color.white,
    fontFamily: FontFamily.Roboto_Light
  },
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(120 / PixelRatio.get()),
    width: PixelRatio.getPixelSizeForLayoutSize(120 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(100 / PixelRatio.get()),
    resizeMode: 'contain'
  },
  textInputStyle: {
    color: color.black,
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),

  }
})