import React from "react";
import { Pressable, Text, View } from "react-native";
import { Colors } from "../configs/common";

export const MapPin = (props) => {
  var { example, color, onPress, textColor = "#FFF" } = props;
  if (!color) {
    color = Colors.PIN.UNAVAILABLE;
  }

  return (
    <View>
      <View style={{ flex: 0, justifyContent: "center", alignItems: "center" }}>
        <Pressable
          onPress={onPress}
          style={{
            backgroundColor: color,
            height: 33.86,
            width: 54.46,
            borderRadius: 200 / 2,
            flex: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat-Bold",
              fontSize: 14,
              color: textColor,
            }}
          >
            {" "}
            {example}
          </Text>
        </Pressable>
        <View
          style={{
            backgroundColor: color,
            height: 8.84,
            width: 8.84,
            borderRadius: 200 / 2,
            marginTop: 3,
          }}
        ></View>
      </View>
    </View>
  );
};
