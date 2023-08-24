import { Text, StyleSheet } from "react-native";
import { Colors } from "../configs/common";

export const CustomText = ({ children, ...props }) => {
return<Text style={styles.text} {...props} >{children}</Text>;
  
};

const styles = StyleSheet.create({
    text:{
        fontFamily:"Montserrat-Bold",
        color:'red',
        fontSize:12,
        color:Colors.COMPANY.PRIMARY
    }
})

