import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomSecureTextInput } from "../components/CustomSecureTextInput";
import { CustomText } from "../components/CustomText";
import { CustomTextInput } from "../components/CustomTextInput";
import { CustomToggle } from "../components/CustomToggle";
import { DhemaxText } from "../components/DhemaxText";
import { HoldingBlock } from "../components/HoldingBlock";
import { TextAndLogo } from "../components/TextAndLogo";
import { Colors } from "../configs/common";
import { COMPANY } from "../configs/global";
import { registerUser } from "../hooks/hooks";
import { is_valid_email, is_valid_password } from "../utils/LoginUtils";
import { CustomButton } from "../components/CustomButton";

export const RegisterView = ({ route, navigation }) => {
  const { w_email } = route.params;
  useEffect(() => {
    setEmail(w_email);
  }, []);

  const [email, setEmail] = useState(w_email);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [toggle, setToggle] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
    if (!is_valid_password({ password: password2 })) {
      setButtonDisabled(true);
      return;
    }
    if (password != password2) {
      setButtonDisabled(true);
      return;
    }
    if (!toggle) {
      setButtonDisabled(true);
      return;
    }
    setButtonDisabled(false);
  };

  const handleEmailChange = (text) => {
    checkValidity({ email: text, password, password2, toggle });
    setEmail(text);
  };

  const handlePass1Change = (text) => {
    checkValidity({ email, password: text, password2, toggle });
    setPassword(text);
  };

  const handlePass2Change = (text) => {
    checkValidity({ email, password, password2: text, toggle });
    setPassword2(text);
  };
  const handleToggleChange = (newToggleState) => {
    checkValidity({ email, password, password2, toggle: newToggleState });
    // Any additional logic you want to add when the toggle changes can go here
    setToggle(newToggleState);
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 25, justifyContent: "space-between" }}>
        <View>
          <TextAndLogo></TextAndLogo>
          <HoldingBlock style={{ padding: 20 }}>
            <Text style={styles.text}>Ingresa tu correo</Text>
            <CustomTextInput value={email} onChangeText={handleEmailChange} />

            <Text style={[styles.text, { paddingTop: 20 }]}>
              Ingresa tu contraseña
            </Text>
            <CustomSecureTextInput
              value={password}
              onChangeText={handlePass1Change}
            />
            <Text style={[styles.text, { paddingTop: 20 }]}>
              Confirma tu contraseña
            </Text>
            <CustomSecureTextInput
              value={password2}
              onChangeText={handlePass2Change}
            />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <CustomToggle
                onToggleChange={handleToggleChange}
                toggle={toggle}
              />
              <Text style={styles.terms}>
                Acepto los{" "}
                <Text style={styles.terms_link}>términos y condiciones</Text>
              </Text>
            </View>
            <View style={{ paddingBottom: 20 }}>
              <CustomButton
                text={"Siguiente"}
                type={"primary"}
                fontsize={18}
                padding={10}
                width={180}
                onPress={handleUserRegister}
                disabled={buttonDisabled}
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
    fontSize: 17,
    fontFamily: `Montserrat-Semi`,
    fontSize: 18,
    color: Colors.APP.DARK_GRAY,
    width: "100%",
    padding: 10,
  },
  terms: {
    fontFamily: `Montserrat-Bold`,
    fontSize: 11,
    color: Colors.APP.DARK_GRAY,
  },
  terms_link: {
    fontFamily: `Montserrat-Bold`,
    textDecorationLine: "underline",
    fontSize: 11,
    color: Colors.COMPANY.PRIMARY_DARK,
  },
});
