import { View, Dimensions, StyleSheet } from "react-native";
import { Colors } from "../configs/common";
const screenWidth = Dimensions.get("window").width;

export const DottedLine = ({
  dotDiameter = 2,
  spaceBetweenDots = 2,
  parentPadding = 0,
}) => {
  const dotWidthWithSpace = dotDiameter + spaceBetweenDots;
  const effectiveWidth = screenWidth - 2 * parentPadding;
  const numberOfDots = Math.floor(effectiveWidth / dotWidthWithSpace);

  return (
    <View style={styles2.container}>
      {Array.from({ length: numberOfDots }).map((_, index) => (
        <View
          key={index}
          style={[
            styles2.dot,
            {
              width: dotDiameter,
              height: dotDiameter,
              borderRadius: dotDiameter / 2,
              marginRight: spaceBetweenDots,
            },
          ]}
        />
      ))}
    </View>
  );
};
const styles2 = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  dot: {
    backgroundColor: Colors.APP.PLACEHOLDER_LIGHT_GRAY,
  },
});
