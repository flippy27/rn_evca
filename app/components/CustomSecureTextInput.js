import { useState } from "react";
import { Platform, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { eyeSvg } from "../../assets/img/eye";
import { Colors } from "../configs/common";
import EyeOpen from "../components/icons/EyeOpen";
import EyeClosed from "../components/icons/EyeClosed";
export const CustomSecureTextInput = ({ value, onChangeText, ...props }) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const isAndroid = Platform.OS === 'android';
  const adjustedFontSize = isPasswordSecure && isAndroid ? 24 : 16; // Puedes ajustar el tamaño según lo necesites

  const EyeIcon = () => {
    return <SvgXml xml={eyeSvg} width="18" height="18" />;
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors.APP.LIGHT_GRAY,
          borderRadius: 999,
          alignItems: "center",
          height: 42,
          paddingHorizontal: 6,
          width: "100%",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: "transparent",
            fontSize: 16,
          }} // You can adjust fontSize as needed
          secureTextEntry={isPasswordSecure}
          placeholder=""
          value={value}
          onChangeText={onChangeText}
          keyboardType={props.keyboardType}
        />
        <TouchableOpacity
          style={{ paddingHorizontal: 10 }}
          onPress={() => setIsPasswordSecure(!isPasswordSecure)}
        >
          {isPasswordSecure && <EyeOpen />}
          {!isPasswordSecure && <EyeClosed />}
        </TouchableOpacity>
      </View>
    </View>
  );
};
