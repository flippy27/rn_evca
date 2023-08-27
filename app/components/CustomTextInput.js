import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Colors } from "../configs/common";

export const CustomTextInput = (props) => {
  return (
    <TextInput keyboardType={props.keyboardType}
      style={[styles.field, props.style]}
      {...props}
      placeholder={props.placeholder}
      
    />
  );
};

const styles = StyleSheet.create({
  field: {
    fontFamily: "Montserrat-Regular",
    backgroundColor: Colors.APP.LIGHT_GRAY,
    color: Colors.APP.APP_DARK_GRAY,
    borderRadius: 50,
    paddingHorizontal: 15,
    height: 42,
    width: "100%",
  },
});
