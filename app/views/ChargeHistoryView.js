import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";
import { Colors } from "../configs/common";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import React from "react";
import CSS1Icon from "../../assets/img/connectors/CCS1";

const mockdata = [
  {
    first_val: "445.940000",
    second_val: "445.940000",
    date_init: "2023-08-25T00:08:17.333Z",
    date_end: "2023-08-25T00:08:27.333Z",
    connector: 16,
    evse: "56722441970181",
    connector_type: "EVPhysicalConnectorType_IEC_62196_T2",
    connector_alias: "Tipo 2",
    location: "T1 DHEMAX",
    minutes: "0.16666666666666666667",
  },
  {
    first_val: "445.930000",
    second_val: "445.940000",
    date_init: "2023-08-24T21:46:48.333Z",
    date_end: "2023-08-24T21:47:17.333Z",
    connector: 16,
    evse: "56722441970181",
    connector_type: "EVPhysicalConnectorType_IEC_62196_T2",
    connector_alias: "Tipo 2",
    location: "T1 DHEMAX",
    minutes: "0.48333333333333333333",
  },
];

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
        <CSS1Icon width={60} height={60} fill="#000" />
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
  return (
    <View>
      <Text
        style={{
          color: Colors.COMPANY.PRIMARY_DARK,
          fontFamily: "Montserrat-Bold",
          fontSize: 20,
          padding:10
        }}
      >
        Historial
      </Text>
      <FlatList
        data={mockdata}
        renderItem={({ item }) => <ChargeHistoryItem item={item} />}
        keyExtractor={(item) => item.id || uuidv4()}
      />
    </View>
  );
};
