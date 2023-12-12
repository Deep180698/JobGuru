import { StyleSheet, Text, View, FlatList, PixelRatio, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../Utils/Color'
import Header from '../../Component/Header'
import JSONList from '../../JSON/JSONList'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomButton from '../../Component/CustomButton'
import FontFamily from '../../Utils/FontFamily'

const ReportScreen = (props) => {

    const [textData, setTextData] = useState('')

    useEffect(() => {

    }, [])


    return (
        <View style={styles.container}>
            {/* Header */}
            <Header title={"Report"} screenName={"normal"} onPress={() => props.navigation.goBack()} />
            {/* body */}


            <View style={{ flex: 1, justifyContent: 'space-between', }}>

                <TextInput
                    value={textData}
                    onChangeText={(i) => setTextData(i)}
                   multiline={true}

                    style={{
                        textAlignVertical:'top',
                        backgroundColor: color.white,
                        height:250,
                        borderRadius:PixelRatio.getPixelSizeForLayoutSize(10/PixelRatio.get()),
                        marginTop:PixelRatio.getPixelSizeForLayoutSize(30/PixelRatio.get())
                    }}
                />

                <CustomButton text={"Report"} textStyle={{ color: color.black }}
                    style={{
                        marginBottom: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
                        backgroundColor: color.white
                    }}
                    press={() => { }}
                />
            </View>

        </View>
    )
}

export default ReportScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.black
    },
    textStyle: {
        fontSize: 14 / PixelRatio.getFontScale(),
        color: color.white,
        fontFamily:FontFamily.Roboto_Medium
    }
})