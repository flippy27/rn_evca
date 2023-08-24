import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import { BottomTabBar } from "./app/components/BottomTabBar";
import { LoginView } from "./app/views/LoginView";
import { PoolDetailView } from "./app/views/PoolDetailView";
import { PoolMapView } from "./app/views/PoolMapView";
import { RegisterView } from "./app/views/RegisterView";
import { WelcomeView } from "./app/views/WelcomeView";
const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

export const MainNavigator = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainStack.Screen name="Auth" component={AuthNavigator} />
    <MainStack.Screen name="App" component={AppNavigator} />
  </MainStack.Navigator>
);

export const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Welcome" component={WelcomeView} />
    <AuthStack.Screen name="Register" component={RegisterView} />
    <AuthStack.Screen name="Login" component={LoginView} />
  </AuthStack.Navigator>
);

export const AppNavigator = () => (
  <AppStack.Navigator
    initialRouteName="BottomTabBar" // Set the initial route
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppStack.Screen name="PoolMap" component={PoolMapView} />
    <AppStack.Screen name="PoolDetail" component={PoolDetailView} />
    <AppStack.Screen name="BottomTabBar" component={BottomTabBar} />
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
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
