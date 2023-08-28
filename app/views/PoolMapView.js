import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MapPin } from "../components/MapPin";

import * as Location from "expo-location";

import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { CustomButton } from "../components/CustomButton";
import { MapModal } from "../components/MapModal";
import { COMPANY } from "../configs/global";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePinMaker } from "../components/PinMaker";
import CenterMapIcon from "../components/icons/CenterMapIcon";
import QuestionMarkIcon from "../components/icons/QuestionMarkIcon";
import { tra } from "../configs/common";
import { remove } from "../utils/saveLoadData";

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371.0; // Radius of the Earth in kilometers
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const DEFAULT_LOCATION = {
  coords: {
    latitude: -33.0053579,
    longitude: -71.6126569,
  },
};

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

const getBoundingRegion = (points) => {
  const latitudes = points.map((point) => point.latitude);
  const longitudes = points.map((point) => point.longitude);

  const maxLat = Math.max(...latitudes);
  const minLat = Math.min(...latitudes);
  const maxLon = Math.max(...longitudes);
  const minLon = Math.min(...longitudes);

  const a = {
    latitude: (maxLat + minLat) / 2,
    longitude: (maxLon + minLon) / 2,
    latitudeDelta: maxLat - minLat + 0.01, // added a small buffer
    longitudeDelta: maxLon - minLon + 0.01, // added a small buffer
  };
  return a;
};

const getClosest = (user_location, pools) => {
  if (pools?.length == 0) {
    return user_location;
  }
  const sorted_pools = pools?.sort((a, b) => {
    const distanceA = haversineDistance(user_location, a);
    const distanceB = haversineDistance(user_location, b);
    return distanceA - distanceB;
  });
  let closest = [];
  if (sorted_pools?.length == 1) {
    closest.push({
      latitude: sorted_pools[0].pool.pool_latitude,
      longitude: sorted_pools[0].pool.pool_longitude,
    });
  } else {
    closest.push(
      {
        latitude: sorted_pools[0].pool.pool_latitude,
        longitude: sorted_pools[0].pool.pool_longitude,
      },
      {
        latitude: sorted_pools[1].pool.pool_latitude,
        longitude: sorted_pools[1].pool.pool_longitude,
      }
    );
  }
  closest.push({
    latitude: user_location.coords.latitude,
    longitude: user_location.coords.longitude,
  });
  return closest;
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
export const removeToken = async () => {
  await remove({ what: "token" });
};
export const FilterButton = ({
  pools,
  filtered,
  setFiltered,
  setFilteredMarkers,
}) => {
  const insets = useSafeAreaInsets();
  const handleFilterPressed = () => {
    // First, toggle the filter state
    const newFilteredState = !filtered;
    setFiltered(newFilteredState);

    // Then, use this new state to determine which markers to show
    const filtered_p = newFilteredState
      ? pools.filter((x) => parseInt(x.text.split("/")[0]) > 0)
      : pools;

    setFilteredMarkers(filtered_p);
  };
  return (
    <View style={[styles.filterButtonContainer, { top: 15 + insets.top }]}>
      <CustomButton
        type={filtered ? "secondary" : "primary"}
        text={filtered ? tra("map", "todos") : tra("map", "filtrar")}
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
  const markersData = usePinMaker(COMPANY);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredMarkers, setFilteredMarkers] = useState(markersData);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [usingDefaultLocation, setUsingDefaultLocation] = useState(true);

  const mapRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setUsingDefaultLocation(false);
    })();
  }, []);

  const centerMapIncludingUserAndPools = () => {
    if (location && markersData && markersData.length > 0) {
      const close = getClosest(location, markersData);

      if (close?.length > 0) {
        const boundingRegion = getBoundingRegion(close);
        // const latslons = markersData.map((x) => {
        //   return { la: x.pool.pool_latitude, lo: x.pool.pool_longitude };
        // });

        // Animate the map to the calculated region
        mapRef.current.animateToRegion(boundingRegion);
      }
    }
  };
  useEffect(() => {
    if (
      !isMapInitialized &&
      location &&
      markersData &&
      !usingDefaultLocation &&
      markersData.length > 0
    ) {
      centerMapIncludingUserAndPools();
      setFilteredMarkers(markersData); // This line ensures that the filteredMarkers are updated every time markersData changes.
      setIsMapInitialized(true); // Mark map as initialized
    } else if (isMapInitialized && markersData) {
      // Ensure that once the map is initialized, markers are still updated.
      setFilteredMarkers(markersData);
    }
  }, [location, markersData, isMapInitialized]);

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
        userInterfaceStyle={"light"}
      >
        {filteredMarkers.map((marker) => (
          <Marker
            tracksViewChanges={false}
            key={marker.pool.id}
            keyExtractor={marker.pool.id}
            coordinate={{
              latitude: marker.pool.pool_latitude,
              longitude: marker.pool.pool_longitude,
            }}
            onPress={() => {
              navigation.navigate("PoolDetail", {
                pool: marker.pool,
                userCoords: location.coords,
              });
            }}
          >
            <MapPin
              example={marker.text}
              color={marker.color}
              onPress={() => {}}
            />
          </Marker>
        ))}
      </MapView>

      <FilterButton
        pools={markersData}
        filtered={isFiltered}
        setFiltered={setIsFiltered}
        setFilteredMarkers={setFilteredMarkers}
      />
      <CenterButton onCenter={removeToken} />

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
