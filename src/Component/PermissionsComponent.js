import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

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

const PermissionsComponent = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

  // Render your component
};

export default PermissionsComponent;
