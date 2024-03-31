import React from 'react';
import { View, Text, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native';
import color from '../../Utils/Color';
import FontFamily from '../../Utils/FontFamily';
import Header from '../../Component/Header';
import CustomButton from '../../Component/CustomButton';

const FileUpload = (props) => {
    return (
        <View style={styles.container}>
            <Header screenName={'fileUpload'} title={"Resume & Portfolio"} onNavigate={() => props.navigation.navigate('UserProfile')} onPress={() => props.navigation.goBack()} />
            
            <Text style={[styles.textStyles, styles.heading]}>{'Resume or CV'}</Text>
            <View style={styles.uploadContainer}>
                <Text style={styles.uploadText}>{'Upload your CV or Resume and \n use it when you apply for jobs'}</Text>
                <View style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>{'Upload a Doc/Docx/PDF'}</Text>
                </View>
                <CustomButton
                    onPress={() => { }}
                    text="Upload"
                    backgroundColor={color.primerycolor}
                    textColor={color.white}
                    btnStyle={styles.uploadButtonStyle}
                />
            </View>
            
            <Text style={[styles.textStyles, styles.heading]}>{'Portfolio'} <Text style={styles.optionalText}>{'(Optional)'}</Text></Text>
            
            <View style={styles.row}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Portfolio Link</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add Slide</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add Photos</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.saveButtonContainer}>
                <CustomButton
                    onPress={() => { }}
                    text="Save"
                    backgroundColor={color.primerycolor}
                    textColor={color.white}
                    btnStyle={styles.saveButtonStyle}
                />
            </View>
        </View>
    );
}

export default FileUpload;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
    },
    textStyles: {
        color: color.black,
        fontSize: 16 / PixelRatio.getFontScale(),
        fontFamily: FontFamily.Roboto_Regular
    },
    heading: {
        marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
        fontFamily: FontFamily.Roboto_Bold
    },
    optionalText: {
        color: color.textColor1
    },
    uploadContainer: {
        marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        borderStyle: 'dotted',
        borderColor: color.primerycolor
    },
    uploadText: {
        marginTop: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
        fontSize: 14 / PixelRatio.getFontScale(),
        textAlign: 'center',
        fontFamily: FontFamily.Roboto_Light
    },
    uploadButton: {
        backgroundColor: color.background1,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get())
    },
    uploadButtonText: {
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
        fontSize: 14 / PixelRatio.getFontScale(),
        textAlign: 'center',
        color: color.primerycolor,
        fontFamily: FontFamily.Roboto_Bold
    },
    uploadButtonStyle: {
        width: '50%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    },
    buttonText: {
        fontSize: 16,
        color: color.primerycolor,
        fontFamily: FontFamily.Roboto_Regular
    },
    saveButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
    },
    saveButtonStyle: {
        width: '100%'
    }
});
