import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../configs/common";

export const CustomToggle = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, toggle ? styles.buttonActive : {}]}
        onPress={() => setToggle(!toggle)}
      >
        <View
          style={[styles.innerCircle, toggle ? styles.innerCircleActive : {}]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "space-between",
  },
  button: {
    width: 40, // Assuming 12 units = 48 pixels in RN
    height: 24,
    backgroundColor: "#FFF", // Gray-200
    borderRadius: 9999, // Rounded-full in Tailwind
    
    borderWidth: 2,
    borderColor: Colors.COMPANY.PRIMARY,
    justifyContent: 'center',
    alignItems: 'flex-start',

  },
  buttonActive: {
    backgroundColor: Colors.COMPANY.PRIMARY, // Green-300
  },
  innerCircle: {
    height: 24, // 6 units
    width: 24, // 6 units
    backgroundColor: "white",
    borderRadius: 16, // Rounded-full in Tailwind
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
    borderWidth:2,
    borderColor: Colors.COMPANY.PRIMARY
  },
  innerCircleActive: {
    transform: [{ translateX: 14 }], // Assuming 6 units = 24 pixels in RN
  },
});
