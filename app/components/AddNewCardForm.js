import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "./CustomButton";
import { CustomTextInput } from "./CustomTextInput";
import { HoldingBlock } from "./HoldingBlock";
import { Colors } from "../configs/common";

export const NewCardForm = ({ onSave }) => {
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiringDate, setExpiringDate] = useState("");
  const [CVV, setCVV] = useState("");

  const handleSave = () => {
    // Create an object with the form data
    const formData = {
      fullName,
      cardNumber,
      expiringDate,
      CVV,
    };

    // Call the onSave prop with the form data
    onSave(formData);

    // Clear the input fields
    setFullName("");
    setCardNumber("");
    setCVV("");
    setExpiringDate("");
  };

  const formatCardNumber = (input) => {
    // Remove non-numeric characters and add spaces every 4 characters
    const formattedInput = input.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit the formatted input to a maximum of 16 characters
    return formattedInput.substring(0, 19); // 16 digits + 3 spaces
  };
  
  const formatCVV = (input) => {
    // Limit the formatted input to a maximum of 16 characters
    return input.substring(0, 3); // 16 digits + 3 spaces
  };
  
  console.log('rendered');
  return (
    <View style={{padding:10}}>
    <HoldingBlock>
    <View>
      <View style={{paddingBottom:20, paddingTop:10}}>
        <Text style={{fontSize:20, color:Colors.APP.DARK_GRAY, fontFamily: "Montserrat-Semi", padding: 5}}> Nombre Completo</Text>
        <CustomTextInput
          placeholder="PlaceHolder"
          value={fullName}
          onChangeText={(inputFullName)=>{
            const maxLength=30
            setFullName(inputFullName.slice(0, maxLength))
          }}
          padding={10}
        />
      </View>
      <View  style={{paddingBottom:20}}>
        <Text style={{fontSize:20, color:Colors.APP.DARK_GRAY, fontFamily: "Montserrat-Semi", padding: 5}}> Número de tarjeta</Text>
        <CustomTextInput
          placeholder="0000 0000 0000 0000"
          value={formatCardNumber(cardNumber)}
          onChangeText={setCardNumber}
          keyboardType={'numeric'}
        />
      </View>
      <View style={{flexDirection:"row" ,alignItems: "flex-start", gap:20}}>
        <View>
          <Text style={{fontSize:12, color:Colors.APP.DARK_GRAY, fontFamily: "Montserrat-Semi", padding: 5}}> Fecha vencimiento</Text>
          <CustomTextInput
            placeholder="00/00"
            value={expiringDate}
            onChangeText={setExpiringDate}
          />
        </View>
        <View  style={{paddingBottom:20}}>
          <Text style={{fontSize:12, color:Colors.APP.DARK_GRAY, fontFamily: "Montserrat-Semi", padding: 5}}> Código de seguridad</Text>
          <CustomTextInput
            placeholder="000"
            value={CVV}
            onChangeText={(inputCVV) => {
              const isAmex = ['34', '37'].includes(cardNumber.slice(0, 2));
              const maxLength = isAmex ? 4 : 3;
              setCVV(inputCVV.slice(0, maxLength));
            }}
            keyboardType={'numeric'}
          />
        </View>
      </View>
    </View>
    <Text style={{fontSize:14, padding:20, fontFamily:'Montserrat-Regular', color:Colors.APP.PLACEHOLDER_LIGHT_GRAY, paddingBottom:20}}>Para tu seguridad Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
    </HoldingBlock>
    <View style={{paddingTop:25, padding:90}}>
        <CustomButton
          text={"Agregar tarjeta"}
          type={"primary"}
          padding={10}
          onPress={handleSave} 
          style={{}}
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
