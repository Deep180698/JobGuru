import React from 'react';
import { View, PixelRatio, StyleSheet, TouchableOpacity } from 'react-native';
import { Dialog, Portal, Button, Text, Modal } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import color from '../Utils/Color';
import FontFamily from '../Utils/FontFamily';

const CustomAlert = ({ visible, message, onClose, alert, onSucess }) => {
  return (

    <Portal>
      <Modal visible={visible} onDismiss={onClose}>
        <Animatable.View animation={"zoomIn"}
          style={styles.container}>
          {alert == 'login' ?
            <View style={{
              paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),

            }}>
              <Text style={[styles.textStyles, {
                paddingVertical: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
              }]}>{message}</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={onClose}
                style={{
                  alignItems: 'flex-end',
                  paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
                  paddingVertical: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
                }}>
                <Text style={[styles.textStyles, { color: color.white }]}>ok</Text>
              </TouchableOpacity>
            </View>
            : null}
          {alert == 'logout' ?
            <View style={{
              paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(15 / PixelRatio.get()),
              paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
            }}>
              <Text style={[styles.textStyles, { paddingVertical: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()) }]}>{message}</Text>
              <View style={{
                flexDirection: 'row', alignSelf: 'flex-end',
                paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
              }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={onClose}
                  style={{

                    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get()),
                  }}>
                  <Text style={[styles.textStyles, { color: color.white }]}>Cencal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={onSucess}
                  style={{

                    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5 / PixelRatio.get()),
                  }}>
                  <Text style={[styles.textStyles, { color: color.white }]}>ok</Text>
                </TouchableOpacity>
              </View>
            </View>
            : null}


        </Animatable.View>
      </Modal>


      {/* </Dialog> */}
    </Portal>
  );
};

const styles = StyleSheet.create({

  container: {
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(30 / PixelRatio.get()),
    backgroundColor: color.black,
    justifyContent: 'center',

  },
  btnStyles: {
    backgroundColor: color.white,
    padding: PixelRatio.getPixelSizeForLayoutSize(10 / PixelRatio.get()),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(20 / PixelRatio.get())
  },
  textStyles: {
    color: color.white,
    fontSize: 12 / PixelRatio.getFontScale(),
    fontFamily:FontFamily.Roboto_Light
  }
})
export default CustomAlert;
