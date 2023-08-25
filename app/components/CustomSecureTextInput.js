import { useState } from "react";
import { Platform, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { eyeSvg } from "../../assets/img/eye";
import { Colors } from "../configs/common";
export const CustomSecureTextInput = ({ value, onChangeText, ...props }) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const EyeIcon = () => {
    return <SvgXml xml={eyeSvg} width="24" height="24" />;
  };
  return (
    <View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          backgroundColor: Colors.APP.INPUT_BACKGROUND,
          borderRadius: 999,
          alignItems: "center",
          height: 48,
          paddingHorizontal: 8,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: "transparent",
            fontSize: Platform.OS === "android" ? 16 : 0,
          }} // You can adjust fontSize as needed
          secureTextEntry={isPasswordSecure}
          placeholder=""
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          style={{ paddingHorizontal: 10 }}
          onPress={() => setIsPasswordSecure(!isPasswordSecure)}
        >
          <EyeIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
