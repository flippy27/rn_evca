import { useState } from "react";
import { Text, TouchableOpacity, View, } from "react-native";
import { CustomTextInput } from "../components/CustomTextInput";
import { MapPin } from "../components/MapPin";
import { Colors } from "../configs/common";
import { COMPANY } from "../configs/global";
import { checkUser } from "../hooks/hooks";
import { is_valid_email } from "../utils/LoginUtils";


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
