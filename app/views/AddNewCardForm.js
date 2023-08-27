import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../configs/common";
import { useState } from "react";
import { HoldingBlock } from "../components/HoldingBlock";
import { CustomButton } from "../components/CustomButton";
import { CustomTextInput } from "../components/CustomTextInput";

export const NewCardForm = ({ onSave }) => {
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiringDate, setExpiringDate] = useState("");
  const [CCV, setCCV] = useState("");

  const handleSave = () => {
    // Create an object with the form data
    const formData = {
      fullName,
      cardNumber,
      expiringDate,
      CCV,
    };

    // Call the onSave prop with the form data
    onSave(formData);

    // Clear the input fields
    setFullName("");
    setCardNumber("");
    setCCV("");
    setExpiringDate("");
  };

  return (
    <View>
      <View>
        <Text> Nombre Completo</Text>
        <CustomTextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          padding={10}
        />
      </View>
      <View>
        <Text> Número de tarjeta</Text>
        <CustomTextInput
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType={'numeric'}
        />
      </View>
      <View style={{flexDirection:"row" ,alignItems: "flex-start" }}>
        <View>
          <Text> Fecha vencimiento</Text>
          <CustomTextInput
            placeholder="Expiring Date"
            value={expiringDate}
            onChangeText={setExpiringDate}
          />
        </View>
        <View>
          <Text> Código de seguridad</Text>
          <CustomTextInput
            placeholder="Security Code"
            value={CCV}
            onChangeText={setCCV}
            keyboardType={'numeric'}
          />
        </View>
      </View>
      <View>
        <CustomButton
          text={"Save"}
          type={"primary"}
          padding={10}
          onPress={handleSave}
        ></CustomButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: Colors.APP.DARK_GRAY,
    fontFamily: `Montserrat-Semi`,
    fontSize: 18,
    width: "100%",
    padding: 10,
  },
  info: {
    color: Colors.COMPANY.PRIMARY_DARK,
    fontSize: 12,
    fontFamily: `Montserrat-Regular`,
    width: "100%",
  },
});
