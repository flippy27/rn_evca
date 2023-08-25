import { Text, StyleSheet } from "react-native";
import { Colors } from "../configs/common";

export const CustomText = ({ children, type = "input" }) => {
  const tt = () => {
    if (type == "input") {
      return {
        color: Colors.APP.DARK_GRAY,
        fontSize: 17,
        weight:"Semi"
      };
    } else if (type == "info") {
      return {
        color: Colors.COMPANY.PRIMARY,
        fontSize: 12,
        weight:"Regular"
      };
    }
  };
  return (
    <Text
      style={{
        fontFamily: `Montserrat-${tt().weight}`,
        fontSize: tt().fontSize,
        color: tt().color,
        width:'100%'
        
      }}
     
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "red",

    color: Colors.COMPANY.PRIMARY,
  },
});
