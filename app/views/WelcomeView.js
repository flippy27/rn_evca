import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import { is_valid_email } from "../utils/LoginUtils";
import { checkUser, useCheckUser } from "../hooks/hooks";
import { CustomTextInput } from "../components/CustomTextInput";
import { COMPANY } from "../configs/global";
import { LogoSVG } from "../components/Logo";
import { DhemaxText } from "../components/DhemaxText";
import { TextAndLogo } from "../components/TextAndLogo";


export const WelcomeView = ({ navigation }) => {
  const [email, setEmail] = useState("hola@dhemax.com");
  const handleEmailCheck = async () => {
    console.log("handling email check");
    if (is_valid_email({ email })) {
      console.log("company", COMPANY);
      const response = await checkUser(COMPANY, email);
      console.log("le data", response);

      if (response.code > 399) {
        //email doenst exists, go to register
        navigation.navigate("Register", {w_email:email});
      } else {
        //email does exist, go to login
        navigation.navigate("Login");
      }
    }
  };
  const handleInputChange = (text) => {
    setEmail(text);
  };
  return (
    <View style={{ padding: 50 }}>
      <CustomTextInput value={email} onChangeText={handleInputChange} />
      <TouchableOpacity
        style={{ borderRadius: 50, backgroundColor: "red", height: 60 }}
        onPress={handleEmailCheck} title='Siguiente'>
        <Text>Siguiente</Text>
      </TouchableOpacity>
      <Text>We're in welcome view</Text>
    </View>
  );
};
