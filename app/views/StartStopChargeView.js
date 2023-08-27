import { Text, Pressable, View, StyleSheet } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ArrowIcon from "../components/icons/ArrowIcon";
import { Colors, Connector } from "../configs/common";
import { useState } from "react";
import { HoldingBlock } from "../components/HoldingBlock";
import { StopChargeModal } from "../components/StopChargeModal";
import { BackBar } from "../components/BackBar";

export const StartStopChargeView = ({ route }) => {
  const [isCharging, setIsCharging] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChargeFinalized, setIsChageFinalized] = useState(false);
  const navigation = useNavigation();
  const { connector, pool, station } = route.params;

  const handleStartCharge = () => {
    console.log("starting charge");
    setIsCharging(true);
  };

  const handleStopCharge = () => {
    console.log("stopping charge");
    setIsCharging(false);
    setIsChageFinalized(true);
  };
  const handleBackButton = () => {
    navigation.goBack();
  };
  const handleCloseVoucher = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "App" }],
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30 }}>
      <View style={{ flex: 1 }}>
        <BackBar text1={pool.pool_name} text2={pool.pool_address} />

        {/* START CHARGER DATA */}
        <View style={{}}>
          <View style={{ paddingBottom: 30 }}>
            <Text style={styles.stationName}>{station.station_name}</Text>
          </View>
          <View
            style={{ flexDirection: "row", gap: 10, alignContent: "center" }}
          >
            {Connector({ name: connector.connector_type_alias })}
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.connectorData}>
                {connector.connector_type_alias}
              </Text>
              <Text style={styles.connectorData}>
                {connector.connector_alias ?? connector.connector_name}
              </Text>
            </View>
          </View>
        </View>
        {/* STOP CHARGER DATA */}
        {!isCharging && !isChargeFinalized && (
          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <CustomButton
              type={"primary"}
              text={"Iniciar carga"}
              onPress={handleStartCharge}
              padding={10}
              width={190}
            />
          </View>
        )}

        {isCharging && !isChargeFinalized && (
          <View style={{ width: "100%" }}>
            <HoldingBlock>
              <View style={{ paddingVertical: 20 }}>
                <Text style={styles.currentChargeTxt}>Carga en curso</Text>
                <Text style={styles.currentChargeType}>kWh</Text>
                <Text style={[styles.currentChargeData, { paddingBottom: 20 }]}>
                  60 kWh
                </Text>
                <Text style={styles.currentChargeType}>Tiempo cargando</Text>
                <Text style={styles.currentChargeData}>25.3 min</Text>
              </View>
            </HoldingBlock>
            <View style={{ alignItems: "center" }}>
              <CustomButton
                type={"secondary"}
                text={"Detener carga"}
                onPress={() => setIsModalVisible(true)}
                padding={10}
                width={190}
              />
            </View>
          </View>
        )}
        {isChargeFinalized && !isCharging && (
          <View style={{ width: "100%" }}>
            <HoldingBlock>
              <View style={{ paddingVertical: 20 }}>
                <Text style={styles.currentChargeTxt}>Carga finalizada!</Text>
                <Text style={styles.currentChargeType}>Tiempo de carga</Text>
                <Text style={[styles.currentChargeData, { paddingBottom: 20 }]}>
                  25.3 min
                </Text>
                <Text style={styles.currentChargeType}>kWh</Text>
                <Text style={styles.currentChargeData}>60 kWh</Text>
              </View>
            </HoldingBlock>
            <View style={{ alignItems: "center" }}>
              <CustomButton
                type={"primary"}
                text={"Cerrar comporbante"}
                onPress={() => handleCloseVoucher()}
                padding={10}
                width={190}
              />
            </View>
          </View>
        )}
        {isModalVisible && (
          <StopChargeModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            stopCharge={handleStopCharge}
          />
        )}
      </View>
      {/* <StopDialogButton setModal={setIsModalVisible} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textBlueBold: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: Colors.COMPANY.PRIMARY_DARK,
  },
  textBlue: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: Colors.COMPANY.PRIMARY_DARK,
  },
  currentChargeTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: 28,
    color: Colors.APP.DARK_GRAY,
    paddingBottom: 20,
  },
  currentChargeType: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    color: Colors.APP.DARK_GRAY,
  },
  currentChargeData: {
    fontFamily: "Montserrat-Bold",
    fontSize: 36,
    color: Colors.APP.DARK_GRAY,
  },
  stationName: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: Colors.COMPANY.PRIMARY_DARK,
  },
  connectorData: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: Colors.APP.DARK_GRAY,
  },
});
