import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();

export const WelcomeView = () => {
  return <Text>home</Text>;
};
export const RegisterView = () => {
  return <Text>register</Text>;
};
export const LoginView = () => {
  return <Text>login</Text>;
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={WelcomeView} />
        <Stack.Screen name="Profile" component={RegisterView} />
        <Stack.Screen name="Settings" component={LoginView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
