// SliderModal.js
import React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import Slider from '@react-native-community/slider';

const SliderModal = ({ visible, onDismiss, value, onValueChange }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20 }}
      >
        <Text variant="titleMedium">Adjust Value</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={value}
          onValueChange={onValueChange}
          step={1}
        />
        <Text>Value: {value}</Text>
        <Button onPress={onDismiss}>Close</Button>
      </Modal>
    </Portal>
  );
};

export default SliderModal;
