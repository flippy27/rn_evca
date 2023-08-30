import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../components/CustomButton";
import { CustomTextInput } from "../components/CustomTextInput";
import { DhemaxText } from "../components/DhemaxText";
import { HoldingBlock } from "../components/HoldingBlock";
import { TextAndLogo } from "../components/TextAndLogo";
import { Colors, tra } from "../configs/common";
import { COMPANY } from "../configs/global";
import { checkUser } from "../hooks/hooks";
import { is_valid_email } from "../utils/LoginUtils";

export const WelcomeView = ({ navigation }) => {
  const [email, setEmail] = useState("hola@dhemax.com");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleEmailCheck = async () => {
    if (is_valid_email({ email })) {
      const response = await checkUser(COMPANY, email);

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
    if (!is_valid_email({ email })) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
    setEmail(text);
  };

  useEffect(() => {
    const initApp = async () => {
      // Simulate a delay - in a real-world scenario, this could be where you check user authentication, etc.
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsLoading(false);
    };

    initApp();
  }, []);

  // if (isLoading) {
  //   return <SplashScreen />;
  // }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "height" : ""}
        keyboardVerticalOffset={Platform.OS === "android" ? -200 : 0}
      >
        <View style={{ flex: 1, padding: 15 }}>
          <View>
            <TextAndLogo></TextAndLogo>
            <HoldingBlock>
              <Text style={styles.text}>{tra("welcome", "correo")}</Text>
              <View style={{ width: "100%", paddingBottom: 20 }}>
                <CustomTextInput
                  placeholder={tra("welcome", "placeholder")}
                  value={email}
                  onChangeText={handleInputChange}
                  keyboardType={"email-address"}
                />
              </View>
              <View
                style={{ alignItems: "center", gap: 20, paddingBottom: 30 }}
              >
                <CustomButton
                  text={tra("welcome", "siguiente")}
                  type={"primary"}
                  fontsize={18}
                  padding={10}
                  width={180}
                  onPress={handleEmailCheck}
                  disabled={buttonDisabled}
                />
                <CustomButton
                  text={tra("welcome", "saltar")}
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
            position: "relative",
            bottom: 0,
            paddingBottom:Platform.OS == "android"?40:0
          }}
        >
          <DhemaxText></DhemaxText>
        </View>
      </KeyboardAvoidingView>
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
