import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";
import { DottedLine } from "../components/DottedLine";
import { Colors, Connector, tra } from "../configs/common";
import { CHARGE_USER_ID } from "../configs/global";
import { fetchMobileChargeHistory } from "../hooks/hooks";

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
          {moment(item.date_init).format(tra("historial", "fecha"))}
        </Text>
        <Text style={styles.text}>
          {moment(item.date_init).format("HH:mm")}
        </Text>
      </View>

      <View style={{ flexDirection: "row", paddingBottom: 7, gap: 10 }}>
        {Connector({ name: item.connector_alias })}
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.text}>{item.location}</Text>
          <Text style={styles.text}>{item.connector_alias}</Text>
          <Text style={styles.textLight}>
            {tra("historial", "tiempocarga")}:{" "}
            <Text style={styles.text}>{item.minutes.split(".")[0]} min</Text>{" "}
          </Text>
        </View>
      </View>

      <DottedLine parentPadding={30} />
    </View>
  );
};
export const ChargeHistoryView = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      fetchMobileChargeHistory(CHARGE_USER_ID)
        .then((responseData) => {
          console.log(responseData);
          setData(responseData);
        })
        .catch((err) => {
          setError(err);
        });
    }, [CHARGE_USER_ID])
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ paddingVertical: 20 }}>
        <Text
          style={{
            color: Colors.COMPANY.PRIMARY_DARK,
            fontFamily: "Montserrat-Bold",
            fontSize: 20,
            paddingHorizontal: 30,
          }}
        >
          {tra("historial", "historial")}
        </Text>
        <FlatList
          contentContainerStyle={{ paddingBottom: 40 }}
          data={Array.isArray(data) ? data.slice(0, 15) : []}
          renderItem={({ item }) => <ChargeHistoryItem item={item} />}
          keyExtractor={(item) => item.id || uuidv4()}
        />
      </View>
    </SafeAreaView>
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
