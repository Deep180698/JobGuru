import React from 'react';
import { View, ActivityIndicator, StyleSheet ,Image} from 'react-native';
import Modal from 'react-native-modal';
import color from '../Utils/Color';
const CustomLoader = ({ isVisible }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0} style={styles.modal}>
        <Image source={require('../assets/loader1.gif')}/>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default CustomLoader;
