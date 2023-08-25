import React, { useEffect, useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { MapPin } from "../components/MapPin";
import { Colors } from "../configs/common";

import * as Location from "expo-location";

import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { MapModal } from "../components/MapModal";

const markersData = [
  { id: 1, latitude: -33.0271086, longitude: -71.5489086, title: "Marker 1" },
  { id: 2, latitude: -33.0269086, longitude: -71.5486886, title: "Marker 2" },
  { id: 3, latitude: -33.0273086, longitude: -71.5485086, title: "Marker 3" },
  // ... add more markers as needed
];

const mock_pool = {
  id: 1,
  pool_name: "L1 Voltex01",
  pool_address: "Vicente Reyes 224,Viña del Mar, Valparaíso, Chile",
  pool_latitude: -33.029262,
  pool_longitude: -71.58064,
  stations: [
    {
      id: 24,
      lineas_id: 1,
      station_name: "DEV-EMULATOR-00003",
      station_alias: null,
      station_status: 1,
      station_identifier: null,
      connectors: [],
    },
    {
      id: 23,
      lineas_id: 1,
      station_name: "DEV-EMULATOR-00002",
      station_alias: null,
      station_status: 1,
      station_identifier: 123456789,
      connectors: [
        {
          id: 166,
          connector_name: "CON-DEV",
          connector_number: 1,
          connector_alias: "CON-DEV-EMU",
          connector_type: "EVPhysicalConnectorType_GBT_DC",
          connector_type_alias: "GB/T_DC",
          connector_status: "Available",
        },
      ],
    },
    {
      id: 12,
      lineas_id: 1,
      station_name: "56722441970181",
      station_alias: "WEEYU 05",
      station_status: 1,
      station_identifier: 56722441970181,
      connectors: [
        {
          id: 16,
          connector_name: "NameConector",
          connector_number: 1,
          connector_alias: "AliasConector",
          connector_type: "EVPhysicalConnectorType_IEC_62196_T2",
          connector_type_alias: "Tipo 2",
          connector_status: "Preparing",
        },
      ],
    },
  ],
};

export const CenterButton = ({ onCenter }) => {
  return (
    <View style={styles.centerButtonContainer}>
      <Button title="Center" onPress={onCenter} />
      {/* Adjust the Button styling as needed */}
    </View>
  );
};
export const HelpDialogButton = ({ setModal }) => {
  return (
    <View style={styles.centerButtonContainer2}>
      <Pressable onPress={() => setModal(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      {/* Adjust the Button styling as needed */}
    </View>
  );
};
export const PoolMapView = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const centerMapOnUser = () => {
    // Assuming the map ref is called mapRef
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!location) {
    return <Text>Waiting for location...</Text>;
  }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        rotateEnabled={false}
        showsCompass={false}
        showsMyLocationButton={false}
      >
        {markersData.map((marker) => (
          <Marker
            tracksViewChanges={false}
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => {
              navigation.navigate("PoolDetail", { pool: mock_pool });
            }}
          >
            <MapPin
              example={marker.title}
              color={Colors.PIN.ALL_AVAILABLE}
              onPress={() => {
                console.log("clicking ");
              }}
            />
          </Marker>
        ))}
      </MapView>
      <CenterButton onCenter={centerMapOnUser} />
      <HelpDialogButton setModal={setIsModalVisible} />
      <MapModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  centerButtonContainer: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center", // this will center the button horizontally
  },
  centerButtonContainer2: {
    position: "absolute",
    bottom: 10,
    alignSelf: "start", // this will center the button horizontally
  },
});
