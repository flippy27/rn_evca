import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { CustomText } from "./CustomText";
import { MapPin } from "./MapPin";
import { Colors } from "../configs/common";

export const MapModal = ({ isModalVisible, setIsModalVisible }) => {
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
            <View style={{justifyContent:'flex-end'}}> 
              <Pressable onPress={() => setIsModalVisible(!isModalVisible)}>
                <Text style={{ fontFamily: "Montserrat-Bold" }}>X</Text>
              </Pressable>
            </View>
            <CustomText style={styles.modalText}>Estados</CustomText>
            <View style={{ flexDirection: "row", alignItems: "center",gap:10 }}>
              <View>
                <MapPin onPress={""} color={Colors.PIN.ALL_AVAILABLE} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.pinText}>Todos</Text>
                  <Text style={styles.pinText}>disponibles</Text>
                </View>
              </View>
              <View>
                <MapPin onPress={""} color={Colors.PIN.SOME_AVAILABLE} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.pinText}>Algunos</Text>
                  <Text style={styles.pinText}>disponibles</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center",gap:12 }}>
              <View>
                <MapPin onPress={""} color={Colors.PIN.NONE_AVAILABLE} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.pinText}>Ninguno</Text>
                  <Text style={styles.pinText}>disponibles</Text>
                </View>
              </View>
              <View>
                <MapPin onPress={""} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.pinText}>Fuera de</Text>
                  <Text style={styles.pinText}>servicio</Text>
                </View>
              </View>
            </View>

            <CustomText>Disponibilidad</CustomText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View>
                <Text style={styles.pinTextBottom}>Conectores</Text>
                <Text style={styles.pinTextBottom}>disponibles</Text>
              </View>
              <MapPin
                onPress={""}
                color={Colors.APP.PLACEHOLDER_LIGHT_GRAY}
                example={"00/00"}
                textColor={Colors.APP.DARK_GRAY}
              />
              <View>
                <Text style={styles.pinTextBottom}>Conectores</Text>
                <Text style={styles.pinTextBottom}>en la estación</Text>
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  pinText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 11,
  },
  pinTextBottom: {
    fontFamily: "Montserrat-Regular",
    fontSize: 10,
  },
});
