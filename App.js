import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { PoolMapView } from "./app/views/PoolMapView";

// import {
//   SafeAreaView,
//   SafeAreaProvider,
//   SafeAreaInsetsContext,
//   useSafeAreaInsets,
//   initialWindowMetrics,
// } from "react-native-safe-area-context";
// import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const navigate = (path, navigation, data) => {
  navigation.navigate(path);
};

export const WelcomeView = ({ navigation }) => {
  return (
    <View style={{ padding: 50 }}>
      <TouchableOpacity
        style={{ borderRadius: 50, backgroundColor: "red", height: 20 }}
        title="Siguiente"
        onPress={() => navigate("Login", navigation)}
      >
        <Text>Siguiente</Text>
      </TouchableOpacity>
      <Text>We're in welcome view</Text>
    </View>
  );
};

export const RegisterView = () => {
  return <Text>register</Text>;
};
export const LoginView = ({ navigation }) => {
  return (
    <View style={{ padding: 50 }}>
      <TouchableOpacity
        style={{ borderRadius: 50, backgroundColor: "blue", height: 20 }}
        title="Siguiente"
        onPress={() => navigate("PoolMap", navigation)}
      >
        <Text>Siguiente</Text>
      </TouchableOpacity>
      <Text>we're in login view</Text>
    </View>
  );
};



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeView} />
        <Stack.Screen name="Register" component={RegisterView} />
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="PoolMap" component={PoolMapView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
