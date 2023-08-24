import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const CustomMarker = ({ title, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.customMarker}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  customMarker: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

