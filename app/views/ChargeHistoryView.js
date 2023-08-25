import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { Colors } from "../configs/common";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMobileChargeHistory } from "../hooks/hooks";
import { CHARGE_USER_ID } from "../configs/global";
import { DottedLine } from "../components/DottedLine";
import CCS1 from "../components/icons/CCS1";
const ChargeHistoryItem = ({ item }) => {
  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 30 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "flex-end",
          paddingBottom: 5,
        }}
      >
        <Text style={styles.text}>
          {moment(item.date_init).format("DD/mm/YY")}
        </Text>
        <Text style={styles.text}>
          {moment(item.date_init).format("HH:MM")}
        </Text>
      </View>

      <View style={{ flexDirection: "row", paddingBottom: 7, gap: 10 }}>
        <CCS1></CCS1>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.text}>{item.location}</Text>
          <Text style={styles.text}>{item.connector_alias}</Text>
          <Text style={styles.textLight}>
            Tiempo de carga:{" "}
            <Text style={styles.text}>
              {parseFloat(item.minutes).toFixed(2)} min
            </Text>{" "}
          </Text>
        </View>
      </View>

      <DottedLine parentPadding={30} />
    </View>
  );
};
export const ChargeHistoryView = () => {
  const [dataArr, setDataArr] = useState([]);
  const { data } = useMobileChargeHistory(CHARGE_USER_ID);
  useEffect(() => {
    setDataArr(data);
  }, []);
  return (
    <View>
      <Text
        style={{
          color: Colors.COMPANY.PRIMARY_DARK,
          fontFamily: "Montserrat-Bold",
          fontSize: 20,
          paddingHorizontal: 30,
        }}
      >
        Historial
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <ChargeHistoryItem item={item} />}
        keyExtractor={(item) => item.id || uuidv4()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat-Bold",
    fontSize: 13,
    color: Colors.APP.DARK_GRAY,
  },
  textLight: {
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
    color: Colors.APP.DARK_GRAY,
  },
});
