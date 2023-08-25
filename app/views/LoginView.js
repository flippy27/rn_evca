import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../components/CustomButton";
import { CustomSecureTextInput } from "../components/CustomSecureTextInput";
import { CustomTextInput } from "../components/CustomTextInput";
import { DhemaxText } from "../components/DhemaxText";
import { HoldingBlock } from "../components/HoldingBlock";
import { TextAndLogo } from "../components/TextAndLogo";
import { Colors } from "../configs/common";
import { COMPANY } from "../configs/global";
import { loginUser } from "../hooks/hooks";
import { is_valid_email, is_valid_password } from "../utils/LoginUtils";

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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 25, justifyContent: "space-between" }}>
        <View>
          <TextAndLogo></TextAndLogo>
          <HoldingBlock>
            <Text style={styles.text}>Ingresa tu correo</Text>
            <CustomTextInput value={email} onChangeText={handleEmailChange} />
            <View style={{ paddingBottom: 15 }}>
              <Text style={styles.info}>
                Hemos detectado que ya estás registrado.
              </Text>
              <Text style={styles.info}>Por favor ingresa tu contraseña</Text>
            </View>
            <View style={{ paddingBottom: 30 }}>
              <Text style={styles.text}>Ingresa tu contraseña</Text>

              <CustomSecureTextInput
                value={password}
                onChangeText={handlePasswordChange}
              />
            </View>

            <View style={{ paddingBottom: 20 }}>
              <CustomButton
                text={"Siguiente"}
                type={"primary"}
                fontsize={18}
                padding={10}
                width={180}
                onPress={handleLogin}
              />
            </View>
          </HoldingBlock>
        </View>
        <DhemaxText></DhemaxText>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    color: Colors.APP.DARK_GRAY,
    fontFamily: `Montserrat-Semi`,
    fontSize: 18,
    width: "100%",
    padding: 10,
  },
  info: {
    color: Colors.COMPANY.PRIMARY_DARK,
    fontSize: 12,
    fontFamily: `Montserrat-Regular`,
    width: "100%",
 
  },
});
