import { Text, StyleSheet } from "react-native";

export const CustomText = ({ children }) => {

  <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
    text:{
        fontFamily:"Montserrat-Regular"
    }
})

