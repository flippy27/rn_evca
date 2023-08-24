import { useState } from "react";
import { CustomSecureTextInput } from "../components/CustomSecureTextInput";
import { CustomTextInput } from "../components/CustomTextInput";
import { View, TouchableOpacity,Text } from "react-native";
import { HoldingBlock } from "../components/HoldingBlock";
import {CustomToggle} from '../components/CustomToggle'

export const RegisterView = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePass1Change = (text) => {
    setEmail(text);
  };
  const handlePass2Change = (text) => {
    setEmail(text);
  };

  const handleUserRegister = () => {};

  return (
    <View style={{ padding: 30 }}>
      <HoldingBlock style={{ padding: 20 }}>
        <CustomTextInput value={email} onChangeText={handleEmailChange} />
        <CustomSecureTextInput
          value={password}
          onChangeText={handlePass1Change}
        />
        <CustomSecureTextInput
          value={password2}
          onChangeText={handlePass2Change}
        />

        {/* <CustomToggle/> */}
        <TouchableOpacity
          style={{ borderRadius: 50, backgroundColor: "red", height: 60 }}
          onPress={handleUserRegister}
        >
          <Text>Siguiente</Text>
        </TouchableOpacity>
      </HoldingBlock>
    </View>
  );
};
