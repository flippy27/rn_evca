import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { is_valid_email } from "../utils/LoginUtils";
import { checkUser, useCheckUser } from "../hooks/hooks";
import { CustomTextInput } from "../components/CustomTextInput";
import { COMPANY } from "../configs/global";
export const WelcomeView = ({ navigation }) => {
  const [email, setEmail] = useState("asd@asd.asd");
  const handleEmailCheck = async () => {
    console.log("handling email check");
    if (is_valid_email({ email })) {
      const company = COMPANY;
      console.log("company", company);
      const response = await checkUser(company, email);
      console.log("le data", response);

      if (response.code > 399) {
        //email doenst exists, go to register
        navigation.navigate('Register')
      } else {
        //email does exist, go to login
        navigation.navigate('Login')
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
        onPress={handleEmailCheck}
      >
        <Text>Siguiente</Text>
      </TouchableOpacity>
      <Text>We're in welcome view</Text>
    </View>
  );
};
