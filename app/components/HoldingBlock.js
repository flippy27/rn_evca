import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export function HoldingBlock ({children})  {

    return <View style={styles.boxWithShadow}>{children}</View>;
  
  
}
const styles = StyleSheet.create({
  boxWithShadow: {
    backgroundColor:'#FFF',
    borderRadius:50,
    margin:20,
    padding:20, 
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,

    elevation: 3,
    overflow:'hidden'
  },
});
