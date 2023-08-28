import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { CustomText } from "./CustomText";
import { MapPin } from "./MapPin";
import { Colors } from "../configs/common";
import { CustomButton } from "./CustomButton";
import { tra } from "../configs/common";

export const StopChargeModal = ({
  isModalVisible,
  setIsModalVisible,
  stopCharge,
}) => {
  const handleYes = () => {
    stopCharge();
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ justifyContent: "flex-end" }}>
              <Text style={styles.textStyle}>
                {tra("startcharge", "seguro")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <CustomButton
                  type={"secondary"}
                  text={tra("startcharge", "si")}
                  onPress={() => handleYes()}
                  padding={10}
                  width={80}
                />
                <CustomButton
                  type={"primary"}
                  text={tra("startcharge", "no")}
                  onPress={() => setIsModalVisible(!isModalVisible)}
                  padding={10}
                  width={80}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontFamily: "Montserrat-Semi",
    fontSize: 18,
    color: Colors.APP.DARK_GRAY,
    paddingBottom: 15,
    textAlign: "center",
    width: 200,
  },
});
