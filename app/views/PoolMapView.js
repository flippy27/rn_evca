import React, { useEffect, useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { MapPin } from "../components/MapPin";

import * as Location from "expo-location";

import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { MapModal } from "../components/MapModal";
import { COMPANY } from "../configs/global";
import { usePinMaker } from "../components/PinMaker";

const markersData = [
  { id: 1, latitude: -33.0271086, longitude: -71.5489086, title: "Marker 1" },
  { id: 2, latitude: -33.0269086, longitude: -71.5486886, title: "Marker 2" },
  { id: 3, latitude: -33.0273086, longitude: -71.5485086, title: "Marker 3" },
  // ... add more markers as needed
];
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
  const markersData2 = usePinMaker(COMPANY);
  console.log(markersData2[0].pool.pool_latitute, 'a');
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
        {markersData2.map((marker) => (
          <Marker
            tracksViewChanges={false}
            key={marker.id}
            coordinate={{
              latitude: marker.pool.pool_latitude,
              longitude: marker.pool.pool_longitude,
            }}
          >
            <MapPin
              example={marker.text}
              color={marker.color}
              onPress={() => {
                navigation.navigate("PoolDetail");
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
