import { useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { CustomTextInput } from "../components/CustomTextInput";
import { DhemaxText } from "../components/DhemaxText";
import { HoldingBlock } from "../components/HoldingBlock";
import { TextAndLogo } from "../components/TextAndLogo";
import { COMPANY } from "../configs/global";
import { checkUser, usePool } from "../hooks/hooks";
import { is_valid_email } from "../utils/LoginUtils";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../configs/common";

export const WelcomeView = ({ navigation }) => {
  const [email, setEmail] = useState("hola@dhemax.com");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const handleEmailCheck = async () => {
    console.log("handling email check");
    if (is_valid_email({ email })) {
      console.log("company", COMPANY);
      const response = await checkUser(COMPANY, email);
      console.log("le data", response);

      if (response.code > 399) {
        //email doenst exists, go to register
        navigation.navigate("Register", { w_email: email });
      } else {
        //email does exist, go to login
        navigation.navigate("Login", { w_email: email });
      }
    }
  };
  const handleSkipLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "App" }],
    });
  };
  const handleInputChange = (text) => {
    const email = text;
    console.log(text);
    if (!is_valid_email({ email })) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
    setEmail(text);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 25 }}>
        <View>
          <TextAndLogo></TextAndLogo>
          <HoldingBlock>
            <Text style={styles.text}>Ingresa tu correo</Text>
            <View style={{ width: "100%", paddingBottom: 20 }}>
              <CustomTextInput
                placeholder={"hola@dhemax.com"}
                value={email}
                onChangeText={handleInputChange}
              />
            </View>
            <View style={{ alignItems: "center", gap: 20, paddingBottom: 30 }}>
              <CustomButton
                text={"Siguiente"}
                type={"primary"}
                fontsize={18}
                padding={10}
                width={180}
                onPress={handleEmailCheck}
                disabled={buttonDisabled}
              />
              <CustomButton
                text={"Saltar inicio de sesión"}
                type={"link"}
                fontsize={18}
                padding={0}
                width={230}
                onPress={handleSkipLogin}
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
    fontSize: 17,
    fontFamily: `Montserrat-Semi`,
    fontSize: 18,
    color: Colors.APP.DARK_GRAY,
    width: "100%",
    padding: 10,
  },
});
