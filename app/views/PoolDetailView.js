import { useEffect, useState } from "react";
import { Text, View, FlatList, Image, Pressable } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { Colors } from "../configs/common";
import { DottedLine } from "../components/DottedLine";
import CCS1 from "../components/icons/CCS1";

export const PoolDetailView = ({ route }) => {
  const {
    pool,
    pool: { stations },
    pool: {
      stations: { connectors },
    },
  } = route.params;
  console.log("jp", pool);

  return (
    <View style={{ padding: 30 }}>
      <View style={{ flexDirection: "row" }}>

        <Text>{"<-"}</Text>
        <Text>{pool.pool_name}, </Text>
        <Text>{pool.pool_address}</Text>
        <Text>a {"1,1Km de tu ubicación"}</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <CustomButton
          type={"primary"}
          text={"Cómo llegar"}
          padding={7}
          width={120}
        />
      </View>
      <FlatList
        data={stations}
        renderItem={({ item }) => <StationItem item={item} />}
        keyExtractor={(item) => item.id || uuidv4()}
      />
    </View>
  );
};

const StationItem = ({ item }) => {
  return (
    <View style={{paddingVertical:10}}>
      <Text
        style={{
          fontFamily: "Montserrat-Bold",
          fontSize: 16,
          color: Colors.APP.DARK_GRAY,
        }}
      >
        {item.station_name}
      </Text>
      <View style={{ padding: 10 }}>
        <FlatList
          data={item.connectors}
          renderItem={({ item }) => <ConnectorItem item={item} />}
          keyExtractor={(item) => item.id || uuidv4()}
        />
      </View>
      <DottedLine />
    </View>
  );
};

const ConnectorItem = ({ item }) => {
  return (
    <Pressable
      style={{ flexDirection: "row" }}
      onPress={() => {
        console.log("pressing", item);
      }}
    >
      <CCS1/>
      <View style={{ gap: 5, padding: 10 }}>
        <Text
          style={{
            fontFamily: "Montserrat-Bold",
            fontSize: 13,
            color: Colors.APP.DARK_GRAY,
          }}
        >
          {item.connector_type_alias} -{" "}
          {item.connector_alias ?? item.connector_name}
        </Text>
        <ConnectorStatusItem status={item.connector_status} />
      </View>
    </Pressable>
  );
};

const ConnectorStatusItem = ({ status }) => {
  console.log(status);
  let pin_color = "purple";
  let text = "default";
  switch (status) {
    case ("Available", "SuspendedEV", "SuspendedEVSE"):
      pin_color = Colors.PIN.ALL_AVAILABLE;
      text = "Disponible";
      break;
    case ("Charging", "Preparing"):
      pin_color = Colors.PIN.NONE_AVAILABLE;
      text = "Ocupado";
      break;
    case ("Offline", "Faulted", "Unavailable"):
      pin_color = Colors.PIN.UNAVAILABLE;
      text = "No disponible";
  }
  return (
    <Text
      style={{ fontFamily: "Montserrat-Bold", color: pin_color, fontSize: 13 }}
    >
      {text}
    </Text>
  );
};
