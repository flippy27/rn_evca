import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomTabBar } from "./app/components/BottomTabBar";
import { PoolMapView } from "./app/views/PoolMapView";
import { PoolDetailView } from "./app/views/PoolDetailView";

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

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
      <Text className="text-3xl underline">We're in welcome view</Text>
    </View>
  );
};

export const RegisterView = () => {
  return <Text>register</Text>;
};

export const LoginView = ({ navigation }) => {
  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "App" }],
    });
  };

  return (
    <View style={{ padding: 50 }}>
      <TouchableOpacity
        style={{ borderRadius: 50, backgroundColor: "blue", height: 20 }}
        title="Siguiente"
        onPress={handleLogin}
      >
        <Text>Siguiente</Text>
      </TouchableOpacity>
      <Text>we're in login view</Text>
    </View>
  );
};

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
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
