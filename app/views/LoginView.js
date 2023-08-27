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
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState(w_email);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(w_email);
  }, []);

  const checkValidity = ({ email, password, password2, toggle }) => {
    console.log(email, password, password2);
    if (!is_valid_email({ email })) {
      setButtonDisabled(true);
      return;
    }
    if (!is_valid_password({ password })) {
      setButtonDisabled(true);
      return;
    }

    setButtonDisabled(false);
  };

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
    checkValidity({ email: text, password });
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    checkValidity({ email, password: text });
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

            <Text
              style={[styles.info, { paddingTop: 20, paddingHorizontal: 10 }]}
            >
              Hemos detectado que ya estás registrado.
            </Text>
            <Text style={[styles.info, { paddingHorizontal: 10 }]}>
              Por favor ingresa tu contraseña
            </Text>

            <Text style={[styles.text, { paddingTop: 20 }]}>
              Ingresa tu contraseña
            </Text>

            <CustomSecureTextInput
              value={password}
              onChangeText={handlePasswordChange}
            />

            <View style={{ paddingVertical: 20 }}>
              <CustomButton
                text={"Siguiente"}
                type={"primary"}
                fontsize={18}
                padding={10}
                width={180}
                onPress={handleLogin}
                disabled={buttonDisabled}
              />
            </View>
          </HoldingBlock>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: Platform.OS == "android" ? 40 : 20,
        }}
      >
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
