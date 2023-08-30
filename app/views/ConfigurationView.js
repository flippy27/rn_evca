import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CreditCard from "../components/icons/CreditCard";
import OpenedDoor from "../components/icons/OpenedDoor";
import { Colors, tra } from "../configs/common";
import AddNewCardView from "./AddNewCardView";
import { useNavigation } from "@react-navigation/native";
import { remove } from "../utils/saveLoadData";

export const ConfigurationView = () => {
  const options = [
    {
      icon: <CreditCard></CreditCard>,
      text: tra("config", "metodo"),
      route: "PaymentMethod",
      id: 1,
    },
    {
      icon: <OpenedDoor></OpenedDoor>,
      text: tra("config", "cerrar"),
      route: "LogOut",
      id: 2,
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={{ padding: 30 }}>
        <Text
          style={{
            color: Colors.COMPANY.PRIMARY_DARK,
            fontFamily: "Montserrat-Bold",
            fontSize: 20,
          }}
        >
          {tra("config", "titulo")}
        </Text>
      </View>
      <View>
        <FlatList
          data={options}
          renderItem={({ item }) => (
            <ConfigurationItem item={item}></ConfigurationItem>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export const ConfigurationItem = ({ item }) => {
  const navigation = useNavigation();
  async function handleNavigate() {
    if (item.route == "LogOut") {
      await remove({ what: "token" });

      // Reset the MainNavigator to show the Welcome screen inside the AuthNavigator
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Auth",
            state: {
              routes: [{ name: "Welcome" }],
            },
          },
        ],
      });
      return;
    }
    navigation.navigate(item.route);
  }
  return (
    <Pressable
      style={{
        paddingLeft: 50,
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
      }}
      onPress={handleNavigate}
    >
      {item.icon}
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Montserrat-Semi",
          color: Colors.COMPANY.PRIMARY_DARK,
        }}
      >
        {" "}
        {item.text}
      </Text>
    </Pressable>
  );
};
