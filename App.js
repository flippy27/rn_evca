import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";
import { BottomTabBar } from "./app/components/BottomTabBar";
import { LoginView } from "./app/views/LoginView";
import { PoolDetailView } from "./app/views/PoolDetailView";
import { PoolMapView } from "./app/views/PoolMapView";
import { RegisterView } from "./app/views/RegisterView";
import { WelcomeView } from "./app/views/WelcomeView";
import { ChargeHistoryView } from "./app/views/ChargeHistoryView";
import { StatusBar } from "expo-status-bar";

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

export const MainNavigator = () => (
  <View style={styles.container}>
    <StatusBar style="dark" />

    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        background: "#FFF",
        backgroundColor: "#FFF",
      }}
    >
      <MainStack.Screen name="Auth" component={AuthNavigator} />
      <MainStack.Screen name="App" component={AppNavigator} />
    </MainStack.Navigator>
  </View>
);

export const AuthNavigator = () => (
  <View style={styles.container}>
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#FFF" },
      }}
    >
      <AuthStack.Screen
        name="Welcome"
        component={WelcomeView}
        options={{ contentStyle: { backgroundColor: "white" } }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterView}
        options={{ contentStyle: { backgroundColor: "white" } }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginView}
        options={{ contentStyle: { backgroundColor: "white" } }}
      />
    </AuthStack.Navigator>
  </View>
);

export const AppNavigator = () => (
  <AppStack.Navigator
    initialRouteName="BottomTabBar" // Set the initial route
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "blue" },
    }}
  >
    <AppStack.Screen
      name="PoolMap"
      component={PoolMapView}
      options={{ contentStyle: { backgroundColor: "white" } }}
    />
    <AppStack.Screen
      name="PoolDetail"
      component={PoolDetailView}
      options={{ contentStyle: { backgroundColor: "white" } }}
    />
    <AppStack.Screen
      name="BottomTabBar"
      component={BottomTabBar}
      options={{ contentStyle: { backgroundColor: "white" } }}
    />
    <AppStack.Screen
      name="ChargeHistoryView"
      component={ChargeHistoryView}
      options={{ contentStyle: { backgroundColor: "white" } }}
    />
  </AppStack.Navigator>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Semi": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null; // Return a loading screen or something
  }
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
