import { PixelRatio, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions, Modal, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../Utils/Color'
import CustomTextInput from './CustomTextInput'
import FontFamily from '../Utils/FontFamily'
import CustomButton from './CustomButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
const { width, height } = Dimensions.get('screen')
const CustomAutoComplate = ({ title, press }) => {
    const [data, setData] = useState('')
    const [texts, setTexts] = useState([]);
    useEffect(() => {

    }, [])

    const handleAddText = () => {
        if (data) {
            setTexts([...texts, data]);
            setData('');
        }
    }
    const handleItemPress = (index) => {
        // Create a copy of the array
        const updatedTexts = [...texts];

        // Remove the item at the specified index
        updatedTexts.splice(index, 1);

        // Update the state with the new array
        setTexts(updatedTexts);
    };

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
                        style={{ width: width - PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()) }}
                        placeholder={title}
                    />
                    <TouchableOpacity onPress={handleAddText} style={[styles.item, {
                        position: 'absolute', right: 10, paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
                        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
                    }]}>
                        <Text style={[styles.textStyles]}>{'Add'}</Text>
                    </TouchableOpacity>
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
                        numColumns={3}
                    />
                </View>
                <TouchableOpacity onPress={() => press(texts)} style={[styles.btnStyles]}>
                    <Text style={styles.btnTextStyles}>{'Done'}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default CustomAutoComplate

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
    },
    btnStyles: {
        backgroundColor: color.black,
        padding: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    },
    btnTextStyles: {
        color: color.white,
        fontSize: 14 / PixelRatio.getFontScale(),
        textAlign: 'center',
        fontFamily: FontFamily.Roboto_Regular

    }
})