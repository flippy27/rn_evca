import { View, Pressable, Text, StyleSheet, Keyboard } from "react-native";
import { Colors } from "../configs/common";
import { useNavigation } from "@react-navigation/native";
import ArrowIcon from "../components/icons/ArrowIcon";
import { tra } from "../configs/common";


/// text 2 and 3 are for pool
export const BackBar = ({
  text1,
  text2 = null,
  text3 = false,
  userCoords = null,
  poolCoords = null,
}) => {
  const navigation = useNavigation();
  const handleBackButton = () => {
    if(Keyboard.isVisible){
      Keyboard.dismiss()
    }
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handleBackButton} style={styles.backButton}>
        <ArrowIcon />
      </Pressable>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.textBlueBold,
            text3 && text2 ? { paddingHorizontal: 0 } : {},
          ]}
        >
          {text1}
          {text2 && <Text style={styles.textBlue}>, {text2}</Text>}{" "}
          {text3 && userCoords && poolCoords && (
            <Text style={styles.textBlueBold}>
              {tra("backbar", "a")}{" "}
              {getPoolDistanceFromUser(userCoords, poolCoords)
                .toFixed(1)
                .replace(".", ",")}
              Km {tra("backbar", "ubicacion")}
            </Text>
          )}
        </Text>
      </View>
      {/* <View style={{ flex: 1 }}></View> */}
    </View>
  );
};

const getPoolDistanceFromUser = (userCoords, poolCoords) => {
  const R = 6371; // Radius of the Earth in kilometers

  // Convert degrees to radians
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const dLat = deg2rad(poolCoords.latitude - userCoords.latitude);
  const dLng = deg2rad(poolCoords.longitude - userCoords.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(userCoords.latitude)) *
      Math.cos(deg2rad(poolCoords.latitude)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  return distance;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 20,
    gap: 20,
  },
  textBlueBold: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: Colors.COMPANY.PRIMARY_DARK,
  },
  textBlue: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: Colors.COMPANY.PRIMARY_DARK,
  },
  backButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 0,
    paddingRight: 0, // un poco de espacio adicional entre el botón y el texto
  },
  textContainer: {
    flex: 6, // puedes ajustar esto según tus necesidades
    justifyContent: "center",
  },
});
