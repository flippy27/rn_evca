import React from "react";
import { Text, View } from "react-native";
import { LogoSVG } from "./Logo";
import { Colors } from "../configs/common";

export const TextAndLogo = () => {
  return (
    <View style={{ flex: 0, justifyContent: "center", alignItems: "center" }}>
      <View>
        <LogoSVG width={96} height={115} />
      </View>
      <Text
        style={{
          fontFamily: "Montserrat-Semi",
          color: "#393737",
          fontSize: 24,
          paddingTop: 15,
        }}
      >
        {Colors.COMPANY.COMPANY_WELCOME_MESSAGE}
      </Text>
    </View>
  );
};
