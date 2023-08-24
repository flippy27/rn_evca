import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Colors } from "../configs/common";

export const CustomTextInput = (props) => {
  
  return <TextInput style={[styles.field, props.style]} {...props} />;
};

const styles = StyleSheet.create({
  field: {
    fontFamily: "Montserrat-Regular",
    backgroundColor: Colors.APP.PLACEHOLDER_LIGHT_GRAY,
    color:  Colors.APP.APP_DARK_GRAY,
    borderRadius: 50, 
    paddingHorizontal: 15, 
    height: 40, 
  },
});
