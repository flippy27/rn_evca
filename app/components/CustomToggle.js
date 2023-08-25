import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../configs/common";

export const CustomToggle = ({toggle,onToggleChange}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, toggle ? styles.buttonActive : {}]}
        onPress={()=>onToggleChange(!toggle)}
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
    width: 40, 
    height: 24,
    backgroundColor: "#FFF", 
    borderRadius: 9999, 
    
    borderWidth: 2,
    borderColor: Colors.COMPANY.PRIMARY,
    justifyContent: 'center',
    alignItems: 'flex-start',

  },
  buttonActive: {
    backgroundColor: Colors.COMPANY.PRIMARY, 
  },
  innerCircle: {
    height: 24, 
    width: 24, 
    backgroundColor: "white",
    borderRadius: 16, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
    borderWidth:2,
    borderColor: Colors.COMPANY.PRIMARY,
    marginLeft: -2,
  },
  innerCircleActive: {
    transform: [{ translateX: 16 }], 
  },
});
