import { useState, useEffect } from "react";
import { CustomSecureTextInput } from "../components/CustomSecureTextInput";
import { CustomTextInput } from "../components/CustomTextInput";
import { View, TouchableOpacity, Text } from "react-native";
import { HoldingBlock } from "../components/HoldingBlock";
import { CustomToggle } from "../components/CustomToggle";
import { CustomText } from "../components/CustomText";
import { is_valid_email, is_valid_password } from "../utils/LoginUtils";
import { registerUser } from "../hooks/hooks";
import { COMPANY } from "../configs/global";
import { TextAndLogo } from "../components/TextAndLogo";
import {DhemaxText} from '../components/DhemaxText'

export const RegisterView = ({ route, navigation }) => {
  const { w_email } = route.params;
  useEffect(() => {
    setEmail(w_email);
  }, []);

  const [email, setEmail] = useState(w_email);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePass1Change = (text) => {
    setPassword(text);
  };
  const handlePass2Change = (text) => {
    setPassword2(text);
  };

  const handleUserRegister = async () => {
    //TODO: falta ver el tema de validacion y disable de boton
    if (password != password2) {
      return;
    }
    console.log("data send", email, password, password2);
    if (is_valid_email({ email }) && is_valid_password({ password })) {
      console.log("llegue al registro");

      const response = await registerUser(COMPANY, email, password);
      console.log("res", response);

      if (response.message == "User Created") {
        navigation.navigate("Login", { w_email: email });
      } else {
        navigation.navigate("App", { screen: "BottomTabBar" });
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
        <TextAndLogo></TextAndLogo>
      <HoldingBlock style={{ padding: 20 }}>
      <CustomText>Ingresa tu correo</CustomText>
        <CustomTextInput value={email} onChangeText={handleEmailChange} />
        <CustomText>Ingresa tu contraseña</CustomText>
        <CustomSecureTextInput
          value={password}
          onChangeText={handlePass1Change}
        />
          <CustomText>Confirma tu contraseña</CustomText>
        <CustomSecureTextInput
          value={password2}
          onChangeText={handlePass2Change}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CustomToggle />
          <CustomText>
            Acepto los{" "}
            <CustomText style={{ textDecorationLine: "underline" }}>
              términos y condiciones
            </CustomText>
          </CustomText>
        </View>
        <TouchableOpacity
          style={{ borderRadius: 50, backgroundColor: "red", height: 60 }}
          onPress={handleUserRegister}
        >
          <Text>Siguiente</Text>
        </TouchableOpacity>
      </HoldingBlock>
      <DhemaxText></DhemaxText>
    </View>
  );
};
