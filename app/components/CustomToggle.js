import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

export const CustomButton = () => {
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
    width: 48, // Assuming 12 units = 48 pixels in RN
    backgroundColor: "#E5E7EB", // Gray-200
    borderRadius: 9999, // Rounded-full in Tailwind
    alignItems: "flex-start",
    padding: 1,
  },
  buttonActive: {
    backgroundColor: "#D1FAE5", // Green-300
  },
  innerCircle: {
    height: 24, // 6 units
    width: 24, // 6 units
    backgroundColor: "white",
    borderRadius: 9999, // Rounded-full in Tailwind
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  innerCircleActive: {
    transform: [{ translateX: 24 }], // Assuming 6 units = 24 pixels in RN
  },
});
