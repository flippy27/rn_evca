import { useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../components/CustomButton";
import { DottedLine } from "../components/DottedLine";
import ArrowIcon from "../components/icons/ArrowIcon";
import { Colors, Connector } from "../configs/common";

export const PoolDetailView = ({ route }) => {
  const navigation = useNavigation();

  const {
    pool,
    pool: { stations },
    pool: {
      stations: { connectors },
    },
  } = route.params;

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 30, flex: 1, paddingVertical: 10 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable onPress={handleBackButton}>
            <ArrowIcon />
          </Pressable>
          <Text style={styles.textBlueBold}>
            {pool.pool_name},{" "}
            <Text style={styles.textBlue}>{pool.pool_address}</Text>{" "}
            <Text style={styles.textBlueBold}>a {"1,1Km de tu ubicación"}</Text>
          </Text>
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
  console.log(status);
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
