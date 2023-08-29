import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBar } from "../components/BackBar";
import { CustomButton } from "../components/CustomButton";
import { HoldingBlock } from "../components/HoldingBlock";
import { StopChargeModal } from "../components/StopChargeModal";
import { Colors, Connector } from "../configs/common";
import { fetchPoolCurrent, startCharge, stopCharge } from "../hooks/hooks";
import { tra } from "../configs/common";
import { InfoModal } from "../components/InfoModal";

export const StartStopChargeView = ({ route }) => {
  const [isCharging, setIsCharging] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [isChargeFinalized, setIsChageFinalized] = useState(false);
  const [startChargeButtonDisabled, setStartChargeButtonDisabled] =
    useState(false);
  const navigation = useNavigation();
  const { connector, pool, station } = route.params;

  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    // Function to fetch status and update state
    const fetchStatus = () => {
      fetchPoolCurrent({ connector_id: connector.id })
        .then((response) => {
          setStatus(response);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    };

    // If isCharging is true, set an interval to call the function every 4 seconds
    if (isCharging) {
      fetchStatus(); // Call the function immediately when isCharging turns true
      intervalId = setInterval(fetchStatus, 4000);
    }

    // Clear the interval when the component is unmounted or when isCharging turns false
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isCharging]);

  const handleStartCharge = async () => {
    setStartChargeButtonDisabled(true);
    const start_response = await startCharge(
      station.station_name,
      connector.connector_number,
      200,
      99999
    );
    if (start_response.message == "Rejected") {
      setStartChargeButtonDisabled(false);
      setInfoModalVisible(true);
    } else {
      setIsCharging(true);
    }
  };

  const handleStopCharge = () => {
    stopCharge(station.station_name, connector.connector_number);
    setIsCharging(false);
    setIsChageFinalized(true);
  };

  const handleCloseVoucher = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "App" }],
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BackBar text1={pool.pool_name} text2={pool.pool_address} />

        {/* START CHARGER DATA */}
        <View style={{ paddingHorizontal: 35 }}>
          <View style={{ paddingBottom: 20 }}>
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
        {!infoModalVisible && !isCharging && !isChargeFinalized && (
          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <CustomButton
              type={"primary"}
              text={tra("startcharge", "iniciar")}
              onPress={handleStartCharge}
              padding={10}
              width={190}
              disabled={startChargeButtonDisabled}
            />
          </View>
        )}

        {isCharging && !isChargeFinalized && (
          <View
            style={{ width: "100%", paddingHorizontal: 10, paddingTop: 10 }}
          >
            <HoldingBlock>
              <View
                style={{
                  paddingVertical: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.currentChargeTxt}>
                  {tra("startcharge", "cargacurso")}
                </Text>
                <Text style={styles.currentChargeType}>kWh</Text>
                <Text style={[styles.currentChargeData, { paddingBottom: 20 }]}>
                  {status?.kwh ? status?.kwh.toString().slice(0, 4) : "--"} kWh
                </Text>
                <Text style={styles.currentChargeType}>
                  {tra("startcharge", "tiempocargando")}
                </Text>
                <Text style={styles.currentChargeData}>
                  {status?.seconds != null
                    ? (status?.seconds / 60).toFixed(2)
                    : "--"}{" "}
                  {tra("startcharge", "min")}
                </Text>
              </View>
            </HoldingBlock>
            <View style={{ alignItems: "center", paddingTop: 10 }}>
              <CustomButton
                type={"secondary"}
                text={tra("startcharge", "detener")}
                onPress={() => setIsModalVisible(true)}
                padding={10}
                width={190}
              />
            </View>
          </View>
        )}
        {isChargeFinalized && !isCharging && (
          <View
            style={{ width: "100%", paddingHorizontal: 10, paddingTop: 10 }}
          >
            <HoldingBlock>
              <View
                style={{
                  paddingVertical: 20,

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.currentChargeTxt}>
                  {tra("startcharge", "finalizada")}
                </Text>
                <Text style={styles.currentChargeType}>
                  {tra("startcharge", "tiempocarga")}
                </Text>
                <Text style={[styles.currentChargeData, { paddingBottom: 20 }]}>
                  {status?.seconds != null
                    ? (status?.seconds / 60).toFixed(2)
                    : "--"}{" "}
                  {tra("startcharge", "min")}
                </Text>
                <Text style={styles.currentChargeType}>kWh</Text>
                <Text style={styles.currentChargeData}>
                  {status?.kwh ? status?.kwh.toString().slice(0, 4) : "--"} kWh
                </Text>
              </View>
            </HoldingBlock>
            <View style={{ alignItems: "center", paddingTop: 10 }}>
              <CustomButton
                type={"primary"}
                text={tra("startcharge", "comprobante")}
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
        {infoModalVisible && (
          <InfoModal
            text={"Hubo un error intentando iniciar carga"}
            isModalVisible={infoModalVisible}
            setIsModalVisible={setInfoModalVisible}
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
