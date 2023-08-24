import { useState } from "react";
import { Text, TouchableOpacity, View, } from "react-native";
import { CustomTextInput } from "../components/CustomTextInput";
import { MapPin } from "../components/MapPin";
import { Colors } from "../configs/common";
import { COMPANY } from "../configs/global";
import { HoldingBlock } from "../components/HoldingBlock";
import { CustomButton } from "../components/CustomButton";
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
        navigation.navigate("Register", { w_email: email });
      } else {
        //email does exist, go to login
        navigation.navigate("Login", { w_email: email });
      }
    }
  };
  const handleInputChange = (text) => {
    setEmail(text);
  };
  
  return (
    <View style={{ padding: 20 }}>
      <HoldingBlock>
        <CustomTextInput value={email} onChangeText={handleInputChange} />
        <TouchableOpacity
          style={{ borderRadius: 50, backgroundColor: "red", height: 60 }}
          onPress={handleEmailCheck}
        >
          <Text>Siguiente</Text>
        </TouchableOpacity>
        <Text>We're in welcome view</Text>
      </HoldingBlock>
      <CustomButton text={"Action"} type={'primary'} padding={10} width={180}/>
      <CustomButton text={"Action"} type={'secondary'} padding={10} width={180}/>
      <CustomButton text={"Action"} type={'tertiary'} padding={10} width={180}/>
      <CustomButton text={"Action"} type={'link'} padding={10} width={180}/>
    </View>
  );
};
