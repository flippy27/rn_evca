import React from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../configs/common";
import { CustomText } from "./CustomText";
import { MapPin } from "./MapPin";

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
            <View
              style={{
                paddingTop: 15,
                paddingBottom: 10,
                minWidth: 200,
                alignItems: "flex-end",
              }}
            >
              <Pressable
                onPress={() => setIsModalVisible(!isModalVisible)}
                style={{ width: 30, height: 30 }}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat-Bold",
                    fontSize: 24,
                    color: Colors.APP.DARK_GRAY,
                  }}
                >
                  X
                </Text>
              </Pressable>
            </View>
            <Text style={styles.modalText}>Estados</Text>

            <View style={{ flexDirection: "column" }}>
              {/* First Row */}
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 15,
                  gap: 20,
                }}
              >
                <View style={{ alignItems: "center", minWidth: 70 }}>
                  <MapPin onPress={""} color={Colors.PIN.ALL_AVAILABLE} />
                  <Text style={styles.pinText}>Todos</Text>
                  <Text style={styles.pinText}>disponibles</Text>
                </View>
                <View style={{ alignItems: "center", minWidth: 70 }}>
                  <MapPin onPress={""} color={Colors.PIN.SOME_AVAILABLE} />
                  <Text style={styles.pinText}>Algunos</Text>
                  <Text style={styles.pinText}>disponibles</Text>
                </View>
              </View>

              {/* Second Row */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ alignItems: "center", minWidth: 70 }}>
                  <MapPin onPress={""} color={Colors.PIN.NONE_AVAILABLE} />
                  <Text style={styles.pinText}>Ninguno</Text>
                  <Text style={styles.pinText}>disponibles</Text>
                </View>
                <View style={{ alignItems: "center", minWidth: 70 }}>
                  <MapPin onPress={""} />
                  <Text style={styles.pinText}>Fuera de</Text>
                  <Text style={styles.pinText}>servicio</Text>
                </View>
              </View>
            </View>

            <Text style={[styles.modalText, { paddingTop: 20 }]}>
              Disponibilidad
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View style={styles.pinTextContainer}>
                <Text style={styles.pinTextBottom}>Conectores</Text>
                <Text style={styles.pinTextBottom}>disponibles</Text>
              </View>
              <MapPin
                onPress={""}
                color={Colors.APP.PLACEHOLDER_LIGHT_GRAY}
                example={"00/00"}
                textColor={Colors.APP.DARK_GRAY}
              />
              <View style={styles.pinTextContainer}>
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
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingBottom: 35,
    paddingHorizontal: 25,
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
    fontFamily: "Montserrat-Bold",
    fontSize: 13,
  },
  pinText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 11,
  },
  pinTextBottom: {
    fontFamily: "Montserrat-Regular",
    fontSize: 10,
  },
  pinTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
