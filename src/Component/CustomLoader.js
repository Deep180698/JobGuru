import React from 'react';
import { View, ActivityIndicator, StyleSheet ,Image} from 'react-native';
import Modal from 'react-native-modal';
const CustomLoader = ({ isVisible }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0} style={styles.modal}>
        <ActivityIndicator size="large" color="#0000ff" />

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
