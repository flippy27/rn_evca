import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Linking,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBar } from "../components/BackBar";
import { CustomButton } from "../components/CustomButton";
import { DottedLine } from "../components/DottedLine";
import { Colors, Connector } from "../configs/common";
import { fetchConnectorsStatus } from "../hooks/hooks";

export const PoolDetailView = ({ route, userCoords }) => {
  const navigation = useNavigation();

  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const {
    pool,
    pool: { stations },
    pool: {
      stations: { connectors },
    },
  } = route.params;
  const getConnectorIds = () => {
    let id_arr = [];
    pool.stations.forEach((s) => {
      s.connectors.forEach((c) => {
        id_arr.push(c.id);
      });
    });
    return id_arr;
  };
  useEffect(() => {
    // Function to fetch status and update state
    const fetchStatus = () => {
      fetchConnectorsStatus(getConnectorIds())
        .then((response) => {
          setStatus(response);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    };

    // Call the function immediately
    fetchStatus();

    // Set an interval to call the function every 4 seconds
    const intervalId = setInterval(fetchStatus, 4000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const openMapsAppWithDirections = (latitude, longitude) => {
    let url = "";

    if (Platform.OS === "ios") {
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
      .catch((err) => console.error("An error occurred", err));
  };

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
            onPress={() =>
              openMapsAppWithDirections(pool.pool_latitude, pool.pool_longitude)
            }
          />
        </View>
        <FlatList
          data={stations.filter((x) => {
            return x.connectors.length > 0;
          })}
          renderItem={({ item }) => (
            <StationItem
              item={item}
              navigation={navigation}
              pool={pool}
              conn_status_arr={status}
            />
          )}
          keyExtractor={(item) => item.id || uuidv4()}
          style={{ paddingHorizontal: 10 }}
        />
      </View>
    </SafeAreaView>
  );
};

const StationItem = ({ item, navigation, pool, conn_status_arr }) => {
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
              conn_status_arr={conn_status_arr}
            />
          )}
          keyExtractor={(item) => item.id || uuidv4()}
        />
      </View>
      <DottedLine />
    </View>
  );
};

const ConnectorItem = ({
  item,
  navigation,
  pool,
  station,
  conn_status_arr,
}) => {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 10,
        gap: 10,
      }}
      onPress={() => {
        navigation.navigate("ChargeScreen", { pool, connector: item, station });
      }}
    >
      {Connector({ name: item.connector_type_alias })}

      <View style={{ gap: 5 }}>
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
        <ConnectorStatusItem
          status={
            conn_status_arr != null
              ? getConnectorStatus({ item, conn_status_arr })
              : item.connector_status
          }
        />
      </View>
    </Pressable>
  );
};

const getConnectorStatus = ({ item, conn_status_arr }) => {
  console.log(conn_status_arr);
  if (!conn_status_arr?.data) {
    return null;
  }
  const { data } = conn_status_arr;
  const conn = data.find((x) => {
    return x.connector_id == item.id;
  });
  return conn.status;
};

const ConnectorStatusItem = ({ status }) => {
  let pin_color;
  let text;
  if (
    status == "Available" ||
    status == "SuspendedEV" ||
    status == "SuspendedEVSE"
  ) {
    pin_color = Colors.PIN.ALL_AVAILABLE;
    text = "Disponible";
  } else if (status == "Charging" || status == "Preparing") {
    pin_color = Colors.PIN.NONE_AVAILABLE;
    text = "Ocupado";
  } else if (
    status == "Offline" ||
    status == "Faulted" ||
    status == "Unavailable"
  ) {
    pin_color = Colors.PIN.UNAVAILABLE;
    text = "No disponible";
  } else {
    pin_color = "black";
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
