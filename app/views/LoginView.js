import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomTextInput } from "../components/CustomTextInput";
import { CustomSecureTextInput } from "../components/CustomSecureTextInput";
import { HoldingBlock } from "../components/HoldingBlock";
import { CustomText } from "../components/CustomText";
import { is_valid_email, is_valid_password } from "../utils/LoginUtils";
import { useEffect, useState } from "react";
import { loginUser } from "../hooks/hooks";
import { COMPANY } from "../configs/global";
export const LoginView = ({ route, navigation }) => {
  const { w_email } = route.params;


  useEffect(() => {
    setEmail(w_email);
  }, []);

  const [email, setEmail] = useState(w_email);
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("empas", email, password);
    if (is_valid_email({ email }) && is_valid_password({ password })) {
      const response = await loginUser(COMPANY, email, password);
      console.log("res", response);
      navigation.reset({
        index: 0,
        routes: [{ name: "App" }],
      });
    }
  };
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  return (
    <View style={{ padding: 20 }}>
      <HoldingBlock>
        <CustomTextInput value={email} onChangeText={handleEmailChange} />
        <CustomText>Hemos detectado que ya estás registrado.</CustomText>
        <CustomText>Por favor ingresa tu contraseña</CustomText>
        <CustomSecureTextInput
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity
          style={{ borderRadius: 50, backgroundColor: "blue", height: 40 }}
          title="Siguiente"
          onPress={handleLogin}
        >
          <Text>Siguiente</Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: "Montserrat-Regular" }}>
          we're in login view
        </Text>
      </HoldingBlock>
    </View>
  );
};
