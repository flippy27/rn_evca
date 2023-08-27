import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBar } from "../components/BackBar";
import { CustomButton } from "../components/CustomButton";
import { DottedLine } from "../components/DottedLine";
import { Colors, Connector } from "../configs/common";
import { Platform, Linking } from 'react-native';

export const PoolDetailView = ({ route,userCoords }) => {
  const navigation = useNavigation();


  const openMapsAppWithDirections = (latitude, longitude) => {
    let url = "";
  
    if (Platform.OS === 'ios') {
      url = `http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`;
    } else {
      url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    }
  
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle URL: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  const {
    pool,
    pool: { stations },
    pool: {
      stations: { connectors },
    },
  } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 30, flex: 1 }}>
        <BackBar
          text1={pool.pool_name}
          text2={pool.pool_address}
          text3={true}
          userCoords={userCoords}
          poolCoords={{
            latitude: pool.pool_latitude,
            longitude: pool.pool_longitude,
          }}
        />
        <View style={{ alignItems: "flex-end" }}>
          <CustomButton
            type={"primary"}
            text={"Cómo llegar"}
            padding={7}
            width={120}
            onPress={() => openMapsAppWithDirections(pool.pool_latitude,pool.pool_longitude)}
          />
        </View>
        <FlatList
          data={stations}
          renderItem={({ item }) => (
            <StationItem item={item} navigation={navigation} pool={pool} />
          )}
          keyExtractor={(item) => item.id || uuidv4()}
        />
      </View>
    </SafeAreaView>
  );
};

const StationItem = ({ item, navigation, pool }) => {
  const station = item;
  return (
    <View style={{ paddingVertical: 10 }}>
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
          renderItem={({ item }) => (
            <ConnectorItem
              item={item}
              navigation={navigation}
              pool={pool}
              station={station}
            />
          )}
          keyExtractor={(item) => item.id || uuidv4()}
        />
      </View>
      <DottedLine />
    </View>
  );
};

const ConnectorItem = ({ item, navigation, pool, station }) => {
  return (
    <Pressable
      style={{ flexDirection: "row" }}
      onPress={() => {
        navigation.navigate("ChargeScreen", { pool, connector: item, station });
      }}
    >
      {Connector({ name: item.connector_type_alias })}
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
  let pin_color;
  let text;
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
      break;
    default:
      pin_color = "purple";
      text = "Default";
      break;
  }
  return (
    <Text
      style={{ fontFamily: "Montserrat-Bold", color: pin_color, fontSize: 13 }}
    >
      {text}
    </Text>
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
});
