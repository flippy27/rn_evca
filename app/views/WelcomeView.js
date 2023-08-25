import { useState } from "react";
import { View } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { CustomText } from "../components/CustomText";
import { CustomTextInput } from "../components/CustomTextInput";
import { HoldingBlock } from "../components/HoldingBlock";
import { TextAndLogo } from "../components/TextAndLogo";
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
        navigation.navigate("Register", { w_email: email });
      } else {
        //email does exist, go to login
        navigation.navigate("Login", { w_email: email });
      }
    }
  };
  const handleSkipLogin = () =>{
    navigation.reset({
      index: 0,
      routes: [{ name: "App" }],
    });
  }
  const handleInputChange = (text) => {
    setEmail(text);
  };

  return (
    <View style={{ padding: 20 }}>
        <TextAndLogo></TextAndLogo>
      <HoldingBlock>
        <CustomText >Ingresa tu correo</CustomText>
        <CustomTextInput value={email} onChangeText={handleInputChange} />
        <View style={{alignItems:'center'}}>
      <CustomButton text={"Siguiente"} type={"primary"} fontsize={18} padding={10} width={180} onPress={handleEmailCheck} />
      <CustomButton text={"Saltar inicio de sesión"} type={"link"} fontsize={18} padding={0} width={230} onPress={handleSkipLogin} />
        
        </View>
      
      </HoldingBlock>
      <DhemaxText></DhemaxText>
    </View>
  );
};
