import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
      <Text style={{ fontFamily: "Montserrat-Regular" }}>
        we're in login view
      </Text>
    </View>
  );
};
