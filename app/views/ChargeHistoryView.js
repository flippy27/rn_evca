import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";
import { Colors } from "../configs/common";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import React, { useEffect } from "react";
import { useMobileChargeHistory } from "../hooks/hooks";
import { CHARGE_USER_ID } from "../configs/global";

const screenWidth = Dimensions.get("window").width;

const DottedLine = ({
  dotDiameter = 2,
  spaceBetweenDots = 2,
  parentPadding = 0,
}) => {
  const dotWidthWithSpace = dotDiameter + spaceBetweenDots;
  const effectiveWidth = screenWidth - 2 * parentPadding;
  const numberOfDots = Math.floor(effectiveWidth / dotWidthWithSpace);

  return (
    <View style={styles2.container}>
      {Array.from({ length: numberOfDots }).map((_, index) => (
        <View
          key={index}
          style={[
            styles2.dot,
            {
              width: dotDiameter,
              height: dotDiameter,
              borderRadius: dotDiameter / 2,
              marginRight: spaceBetweenDots,
            },
          ]}
        />
      ))}
    </View>
  );
};
const styles2 = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  dot: {
    backgroundColor: "black",
  },
});

const ChargeHistoryItem = ({ item }) => {
  return (
    <View style={{ padding: 10 }}>
      <View
        style={{ flexDirection: "row", gap: 10, justifyContent: "flex-end" }}
      >
        <Text>{moment(item.date_init).format("DD/mm/YY")}</Text>
        <Text>{moment(item.date_init).format("HH:MM")}</Text>
      </View>
      
      <Text>{item.location}</Text>
      <Text>{item.connector_alias}</Text>
      <Text>
        Tiempo de carga: <Text>{item.minutes}</Text>{" "}
      </Text>
      <DottedLine parentPadding={10} />
    </View>
  );
};
export const ChargeHistoryView = () => {
  const { data } = useMobileChargeHistory(CHARGE_USER_ID);
  return (
    <View>
      <Text
        style={{
          color: Colors.COMPANY.PRIMARY_DARK,
          fontFamily: "Montserrat-Bold",
          fontSize: 20,
          padding: 10,
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
