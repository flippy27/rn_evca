import React, { useEffect, useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { MapPin } from "../components/MapPin";

import * as Location from "expo-location";

import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { MapModal } from "../components/MapModal";
import { COMPANY } from "../configs/global";
import { usePinMaker } from "../components/PinMaker";
import { CustomButton } from "../components/CustomButton";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import CenterMapIcon from "../components/icons/CenterMapIcon";
import QuestionMarkIcon from "../components/icons/QuestionMarkIcon";

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
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.centerButtonContainer, { top: 40 + insets.top, left: 20 }]}
    >
      <Pressable
        onPress={onCenter}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <CenterMapIcon />
      </Pressable>
    </View>
  );
};
export const FilterButton = ({ pools, filtered, setFiltered }) => {
  const filterPools = () => {
    return pools.filter((x) => {
      return parseInt(x.text.split("/")[0]) > 0;
    });
  };
  const insets = useSafeAreaInsets();
  const handleFilterPressed = () => {
    setFiltered(!filtered);
    filterPools();
  };
  return (
    <View style={[styles.filterButtonContainer, { top: 15 + insets.top }]}>
      <CustomButton
        type={filtered?"secondary":"primary"}
        text={filtered?"Ver todos":"Filtrar disponibles"}
        padding={5}
        width={150}
        onPress={() => handleFilterPressed()}
      ></CustomButton>
    </View>
  );
};

export const HelpDialogButton = ({ setModal }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.helpButtonContainer, { top: 110 + insets.top, left: 20 }]}
    >
      <Pressable
        onPress={() => setModal(true)}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <QuestionMarkIcon />
      </Pressable>
      {/* Adjust the Button styling as needed */}
    </View>
  );
};
export const PoolMapView = () => {
  const markersData2 = usePinMaker(COMPANY);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredMarkers, setFilteredMarkers] = useState(markersData2);
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
        {markersData2.map((marker) => (
          <Marker
            tracksViewChanges={false}
            key={marker.id}
            coordinate={{
              latitude: marker.pool.pool_latitude,
              longitude: marker.pool.pool_longitude,
            }}
            onPress={() => {
              navigation.navigate("PoolDetail", { pool: mock_pool });
            }}
          >
            <MapPin
              example={marker.text}
              color={marker.color}
              onPress={() => {
                console.log("clicking ");
              }}
            />
          </Marker>
        ))}
      </MapView>
      <FilterButton
        pools={markersData2}
        filtered={isFiltered}
        setFiltered={setIsFiltered}
      />
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
    alignSelf: "center",
    backgroundColor: "#FFF",
    width: 54,
    height: 54,
    borderRadius: 999,
  },
  filterButtonContainer: {
    position: "absolute",
    alignSelf: "center",
  },
  helpButtonContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    top: 10,
    backgroundColor: "#FFF",
    width: 54,
    height: 54,
    borderRadius: 999,
    alignSelf: "start", // this will center the button horizontally
  },
});
