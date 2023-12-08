import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, PixelRatio ,PermissionsAndroid, Platform} from 'react-native';
import color from '../Utils/Color';
import Entypo from 'react-native-vector-icons/Entypo'
import ImagePicker from 'react-native-image-crop-picker';
import FontFamily from '../Utils/FontFamily';


const CustomBottomSheet = ({ isOpen, onClose, getCall ,data}) => {
  const [images, setImages] = useState(null);

  useEffect(() => {

    requestPermissions();
  }, []);

  
const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const cameraPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    return cameraPermission === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // On iOS, permission is handled at build time in the Info.plist
};

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    const storagePermission = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    return (
      storagePermission['android.permission.READ_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      storagePermission['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
    );
  }
  return true; // On iOS, permission is handled at build time in the Info.plist
};

const requestPermissions = async () => {
  const cameraPermissionGranted = await requestCameraPermission();
  const storagePermissionGranted = await requestStoragePermission();

  if (!cameraPermissionGranted || !storagePermissionGranted) {
    // Handle the case when permissions are not granted
  }
};
  
  const openPicker = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      });

      data(result)

    
    } catch (error) {
      console.error('Error picking image:', error);
    
    }
  };
  const openCamaraPicker = async () => {
    try {
      const result = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });

      // Handle the selected image
     data(result)

    } catch (error) {
      console.error('Error picking image:', error);
    
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={isOpen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            {/* Content of your bottom sheet */}
            {getCall == "imageSelection" ?

              <View>
                <TouchableOpacity activeOpacity={0.6} onPress={() => openCamaraPicker()} style={styles.btnStyle}>
                  <Entypo name='camera' color={color.black} size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} />
                  <Text style={[styles.textStyle, { marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Upload from camara"}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={() => openPicker()} style={styles.btnStyle}>
                  <Entypo name='folder-images' color={color.black} size={PixelRatio.getPixelSizeForLayoutSize(25 / PixelRatio.get())} />
                  <Text style={[styles.textStyle, { marginLeft: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>{"Upload from Gallery"}</Text>
                </TouchableOpacity>

              </View>
              : null}

            <TouchableOpacity activeOpacity={0.6} onPress={onClose} style={[styles.btnStyle, { backgroundColor: color.golden, alignSelf: 'center', padding: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()), borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()) }]}>
              <Text style={[styles.textStyle]}>{"Cancel"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: PixelRatio.getPixelSizeForLayoutSize(16 / PixelRatio.get()),
    borderTopLeftRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    borderTopRightRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    width: '100%',
  },
  closeButton: {
    color: 'blue',
    marginTop: 16,
  },
  textStyle: {
    fontSize: 14 / PixelRatio.getFontScale(),
    color: color.black,
    fontFamily:FontFamily.Roboto_Light
  },
  btnStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get())
  }
});

export default CustomBottomSheet;
