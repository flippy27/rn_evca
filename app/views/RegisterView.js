import { useState } from "react";
import { CustomSecureTextInput } from "../components/CustomSecureTextInput";
import { CustomTextInput } from "../components/CustomTextInput";
import { View } from "react-native";

export const RegisterView = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email,setEmail] = useState("")

  const handleEmailChange = (text) =>{
    setEmail(text)
  }
  const handlePass1Change = (text) =>{
    setEmail(text)
  }
  const handlePass2Change = (text) =>{
    setEmail(text)
  }

  return (
    <View style={{padding: 30}}>
      <CustomTextInput value={email}  onChangeText={handleEmailChange}/>
      <CustomSecureTextInput value={password}  onChangeText={handlePass1Change}/>
      <CustomSecureTextInput value={password2}  onChangeText={handlePass2Change}/>
    </View>
  );
};
