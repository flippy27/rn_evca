import { Pressable, Text } from "react-native";
import { Colors } from "../configs/common";

export const CustomButton = ({ text, type, padding, width, height, onPress, fontsize}) => {
  const bd = () => {
    if (type == "primary") {
      return {
        background: Colors.COMPANY.PRIMARY,
        background_pressed: Colors.COMPANY.PRIMARY_DARK,
        background_disabled: Colors.COMPANY.PRIMARY_DISABLED,
        color: "#FFF",
        color_disabled: "#FFF",
        border: 0,
        borderColor: "transparent",
      };
    } else if (type == "secondary") {
      return {
        background: Colors.COMPANY.SECONDARY,
        background_pressed: Colors.COMPANY.SECONDARY_DARK,
        background_disabled: Colors.COMPANY.SECONDARY_DISABLED,
        color: Colors.COMPANY.PRIMARY,
        color_disabled: Colors.COMPANY.PRIMARY_DISABLED,
        border: 1,
        borderColor: Colors.COMPANY.PRIMARY,
      };
    } else if (type == "tertiary") {
      return {
        background: Colors.COMPANY.SECONDARY,
        background_pressed: Colors.COMPANY.SECONDARY_DARK,
        background_disabled: Colors.COMPANY.SECONDARY_DISABLED,
        color: Colors.COMPANY.PRIMARY,
        color_disabled: Colors.COMPANY.PRIMARY_DISABLED,
        border: 0,
        borderColor: Colors.COMPANY.PRIMARY,
      };
    } else if (type == "link") {
      return {
        background: Colors.COMPANY.SECONDARY,
        background_pressed: Colors.COMPANY.SECONDARY_DARK,
        background_disabled: Colors.COMPANY.SECONDARY_DISABLED,
        color: Colors.COMPANY.PRIMARY,
        color_disabled: Colors.COMPANY.PRIMARY_DISABLED,
        border: 0,
        borderColor: Colors.COMPANY.PRIMARY,
      };
    }
  };

  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? bd().background_pressed : bd().background, // adjust the rgba value to your base color
        padding: padding,
        alignItems: "center",
        borderRadius: 9999,
        width: width,
        height: height,
        borderWidth: bd().border,
        borderColor: bd().borderColor,
      })}
      onPress={onPress}
    >
      <Text
        style={{
          color: bd().color,
          fontFamily: "Montserrat-Semi",
          textDecorationLine: type == "link" ? "underline" : "none",
          fontSize:fontsize
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
