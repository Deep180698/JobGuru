import { PixelRatio, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../Utils/Color'
import CustomTextInput from './CustomTextInput'
import FontFamily from '../Utils/FontFamily'
import CustomButton from './CustomButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
const { width, height } = Dimensions.get('screen')

const CustomAddress = ({ title, press}) => {
    const [data, setData] = useState('')
    const [texts, setTexts] = useState([]);
    useEffect(() => {
     
    }, [])
    // Render item for FlatList
    const renderItem = ({ item, index }) => (
        <View>
            <View style={styles.item}>
                <Text style={styles.textStyles}>{item}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={() => handleItemPress(index)} style={{ position: 'absolute', right: 0, top: 0, zIndex: 2, backgroundColor: color.white, borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }} >
                <AntDesign name='closecircle' color={color.red} size={PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get())} />
            </TouchableOpacity>
        </View>
    );
  return (
    <View style={styles.container}>
          
                <View style={{ marginHorizontal: 10, flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomTextInput
                            value={data}
                            onChangeText={(i) => setData(i)}
                            type={"whiteBc"}
                            placeholder={title}
                        />
                       
                    </View>

                    <View style={{
                        borderBottomWidth: 1,
                        borderColor: color.black,
                        marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
                    }} />
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={texts}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                

                </View>
        </View>
  )
}

export default CustomAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    textStyles: {
        color: color.white,
        fontSize: 12 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Regular

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