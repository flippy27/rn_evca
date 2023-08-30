import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import { CustomButton } from "./CustomButton";
import { CustomTextInput } from "./CustomTextInput";
import { HoldingBlock } from "./HoldingBlock";
import { Colors, tra } from "../configs/common";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";

export const NewCardForm = ({ onSave }) => {
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiringDate, setExpiringDate] = useState("");
  const [CVV, setCVV] = useState("");
  const isAmex = ["34", "37"].includes(cardNumber.slice(0, 2));
  const cvvPlaceHolder = isAmex ? "0000" : "000";
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigation = useNavigation();

  const isExpiryDateValid = (expDate) => {
    if (expDate.length >= 4) {
      const expiryMoment = moment(expDate, "MM/YY");

      return (
        expiryMoment.isValid() && moment().isBefore(expiryMoment.endOf("month"))
      );
    } else {
      return false;
    }
  };
  const formatExpiryDate = (input) => {
    const numericInput = input.replace(/\D/g, "");

    let month = numericInput.substring(0, 2);
    if (parseInt(month) > 12) {
      month = "12";
    }
    let year = numericInput.substring(2, 4);
    const currentYear = moment().format("YY");
    const maxAllowableYear = (parseInt(currentYear) + 20).toString().slice(-2);

    if (parseInt(year) < parseInt(currentYear)) {
      year = numericInput.substring(2, 3);
    }
    if (parseInt(year) > parseInt(maxAllowableYear)) {
      year = maxAllowableYear;
    }
    if (numericInput.length > 2) {
      return `${month}/${year}`;
    }
    return month;
  };

  const handleSave = () => {
    const formData = {
      fullName,
      cardNumber,
      expiringDate,
      CVV,
      id: uuidv4(),
    };
    onSave(formData);
    setFullName("");
    setCardNumber("");
    setCVV("");
    setExpiringDate("");
    navigation.goBack();
  };

  const formatCardNumber = (input) => {
    const formattedInput = input
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ");

    return formattedInput.substring(0, 19);
  };

  useEffect(() => {
    const isValid =
      fullName.length > 4 &&
      cardNumber.length === 19 &&
      isExpiryDateValid(expiringDate) &&
      CVV.length >= 3;

    

    setButtonDisabled(!isValid);
  }, [fullName, cardNumber, expiringDate, CVV]);

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <HoldingBlock>
        <View>
          <View style={{ paddingBottom: 20, paddingTop: 10 }}>
            <Text
              style={{
                fontSize: 20,
                color: Colors.APP.DARK_GRAY,
                fontFamily: "Montserrat-Semi",
                padding: 5,
              }}
            >
              {" "}
              {tra("agregartarjeta", "nombre")}
            </Text>
            <CustomTextInput
              placeholder="PlaceHolder"
              value={fullName}
              onChangeText={(inputFullName) => {
                const maxLength = 30;
                setFullName(inputFullName.slice(0, maxLength));
              }}
              padding={10}
            />
          </View>
          <View style={{ paddingBottom: 20 }}>
            <Text
              style={{
                fontSize: 20,
                color: Colors.APP.DARK_GRAY,
                fontFamily: "Montserrat-Semi",
                padding: 5,
              }}
            >
              {" "}
              {tra("agregartarjeta", "numero")}
            </Text>
            <CustomTextInput
              placeholder="0000 0000 0000 0000"
              value={formatCardNumber(cardNumber)}
              onChangeText={(input) => {
                setCardNumber(input);
                if (formatCardNumber(input).length === 19) {
                  Keyboard.dismiss();
                }
              }}
              keyboardType={"numeric"}
            />
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "flex-start", gap: 20 }}
          >
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.APP.DARK_GRAY,
                  fontFamily: "Montserrat-Semi",
                  padding: 5,
                }}
              >
                {" "}
                {tra("agregartarjeta", "fecha")}
              </Text>
              <CustomTextInput
                placeholder="00/00"
                value={expiringDate}
                onChangeText={(input) => {
                  const formattedDate = formatExpiryDate(input);
                  setExpiringDate(formattedDate);
                  if (formattedDate.length === 5) {
                    Keyboard.dismiss();
                  }
                }}
                keyboardType={"number-pad"}
              />
            </View>
            <View style={{ paddingBottom: 20 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.APP.DARK_GRAY,
                  fontFamily: "Montserrat-Semi",
                  padding: 5,
                }}
              >
                {" "}
                {tra("agregartarjeta", "codigo")}
              </Text>
              <CustomTextInput
                placeholder={cvvPlaceHolder}
                value={CVV}
                onChangeText={(inputCVV) => {
                  const maxLength = isAmex ? 4 : 3;
                  setCVV(inputCVV.slice(0, maxLength));
                  if (inputCVV.length == maxLength) {
                    Keyboard.dismiss();
                  }
                }}
                keyboardType={"numeric"}
              />
            </View>
          </View>
        </View>
        <Text
          style={{
            fontSize: 14,
            padding: 20,
            fontFamily: "Montserrat-Regular",
            color: "#00000044",
            paddingBottom: 20,
          }}
        >
          Para tu seguridad Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt
        </Text>
      </HoldingBlock>
      <View style={{ paddingTop: 25, padding: 90 }}>
        <CustomButton
          text={tra("agregartarjeta", "boton")}
          type={"primary"}
          padding={10}
          onPress={handleSave}
          style={{}}
          disabled={buttonDisabled}
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
