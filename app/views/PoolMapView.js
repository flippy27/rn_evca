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

function haversineDistance(coord1, coord2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
  const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.latitude * (Math.PI / 180)) * Math.cos(coord2.latitude * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getTwoClosestPins(userLocation, mapPins) {
  // Calculate the distance for each pin from the user location
  const distances = mapPins.map(pin => {
    return {
      pin: pin,
      distance: haversineDistance(userLocation, {
        latitude: pin.pool.pool_latitude,
        longitude: pin.pool.pool_longitude
      })
    };
  });

  // Sort the distances and pick the first two
  distances.sort((a, b) => a.distance - b.distance);
  
  return distances.slice(0, 2).map(d => d.pin);
}
const getBoundingRegion = (points) => {
  const latitudes = points.map(point => point.latitude);
  const longitudes = points.map(point => point.longitude);
  
  const maxLat = Math.max(...latitudes);
  const minLat = Math.min(...latitudes);
  const maxLon = Math.max(...longitudes);
  const minLon = Math.min(...longitudes);
  
  return {
      latitude: (maxLat + minLat) / 2,
      longitude: (maxLon + minLon) / 2,
      latitudeDelta: (maxLat - minLat) + 0.70, // added a small buffer
      longitudeDelta: (maxLon - minLon) + 0.70  // added a small buffer
  };
};


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
  const markersData2 = usePinMaker('6dae7536-27c3-4c10-9a49-ff303e7d925f');
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

  const [centerCoords, setCenterCoords] = useState(null);

  const centerMapIncludingUserAndPools = () => {
    if (location && markersData2 && markersData2.length > 0) {
        const twoClosestPins = getTwoClosestPins(location, markersData2);
  
        // Create an array of points that includes user location and the two closest pins
        const points = [
            { latitude: location.coords.latitude, longitude: location.coords.longitude },
            { latitude: twoClosestPins[0].pool.pool_latitude, longitude: twoClosestPins[0].pool.pool_longitude },
            { latitude: twoClosestPins[1].pool.pool_latitude, longitude: twoClosestPins[1].pool.pool_longitude }
        ];
  
        // Get the bounding region using our modified function
        const boundingRegion = getBoundingRegion(points);
  
        // Animate the map to the calculated region
        mapRef.current.animateToRegion(boundingRegion);
    }
};
useEffect(() => {
  centerMapIncludingUserAndPools();
}, [location, markersData2]);

  const centerMapOnUser = () => {
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
      <CenterButton onCenter={centerMapIncludingUserAndPools} />
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
