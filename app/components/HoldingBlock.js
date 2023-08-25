import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export function HoldingBlock ({children})  {

    return <View style={styles.modalView}>{children}</View>;
  
  
}
const styles = StyleSheet.create({
  boxWithShadow: {
    backgroundColor:'#FFF',
    borderRadius:21,
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

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding:20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
