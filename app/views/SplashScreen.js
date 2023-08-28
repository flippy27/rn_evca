import { View } from "react-native";
import { DhemaxText } from "../components/DhemaxText";
import { LogoSVG } from "../components/Logo";
import { SafeAreaView } from "react-native-safe-area-context";
import { load, remove } from "../utils/saveLoadData";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      
      const data = await load({ what: "token" });
      setTimeout(() => {
        if (data != "no data") {
          navigation.reset({
            index: 0,
            routes: [{ name: "App" }],
          });
        } else {
          navigation.reset({
            index: 1,
            routes: [{ name: "Welcome" }], // Navega a la vista de bienvenida si el token no existe
          });
        }
      }, 2000);
    };

    fetchToken();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{ flex: 0.9, justifyContent: "center", alignItems: "center" }}
        >
          <LogoSVG width={154} height={183} />
        </View>

        <View
          style={{
            flex: 0.1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <DhemaxText />
        </View>
      </View>
    </SafeAreaView>
  );
};
