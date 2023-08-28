import { View } from "react-native";
import { DhemaxText } from "../components/DhemaxText";
import { LogoSVG } from "../components/Logo";
import { SafeAreaView } from "react-native-safe-area-context";

export const SplashScreen = () => {
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
        <View style={{ flex: 0.9, justifyContent: "center", alignItems: "center" }}>
            <LogoSVG width={154} height={183} />
        </View>

        <View style={{ flex: 0.1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 10 }}>
            <DhemaxText />
        </View>
    </View>
</SafeAreaView>
  );
};
