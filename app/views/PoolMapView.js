import React, { useEffect, useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { MapPin } from "../components/MapPin";

import * as Location from "expo-location";

import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { MapModal } from "../components/MapModal";
import { COMPANY } from "../configs/global";
import { pinMaker } from "../components/PinMaker";
import { CustomButton } from "../components/CustomButton";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import CenterMapIcon from "../components/icons/CenterMapIcon";
import QuestionMarkIcon from "../components/icons/QuestionMarkIcon";

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
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredMarkers, setFilteredMarkers] = useState(markersData);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [markersData, setMarkersData]= useState([])

  // useEffect(()=>{
  //   const markersData = pinMaker(COMPANY).then(pines => {
  //     setMarkersData(pines)
  //   }).catch(error => {
  //     console.error("Error generating pines:", error);
  //   });
  // },[])
  
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
    if (location && markersData && markersData.length > 0) {
        const twoClosestPins = getTwoClosestPins(location, markersData);
  
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
}, [location, markersData]);

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
        {markersData.map((marker) => (
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
        pools={markersData}
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
