import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";
import { BackBar } from "../components/BackBar";
import CreditCard from "../components/icons/CreditCard";
import { CustomButton } from "../components/CustomButton";
import { load } from "../utils/saveLoadData";
import Plus from "../components/icons/Plus";
import { Colors } from "../configs/common";
import CardEllipse from "../components/icons/CardEllipse";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "../utils/customNavigate";


export const PaymentMethodView = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await load({ what: "cards" });
      if (data == "no data") {
        return;
      }
      setCards(data);
    };
    fetchData();
  }, []);
  useFocusEffect(() => {
    console.log("called");
    const fetchData = async () => {
      const data = await load({ what: "cards" });
      if (data == "no data") {
        return;
      }
      setCards(data);
    };
    fetchData();
  });

  const navigation = useNavigation();
  function handleNavigateToPayment() {
    navigation.navigate("AddPayment");
  }

  return (
    <SafeAreaView>
      <BackBar text1={"Método de pago"}></BackBar>

      <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
        <View style={{ paddingBottom: 42, gap: 10 }}>
          <FlatList
            data={cards}
            renderItem={({ item }) => (
              <PaymentMethodSaved item={item}></PaymentMethodSaved>
            )}
            keyExtractor={(item) => Math.random()}
          />
        </View>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center", gap: 11 }}
          onPress={handleNavigateToPayment}
        >
          <Plus></Plus>
          <Text
            style={{
              fontSize: 16,
              color: Colors.COMPANY.PRIMARY_DARK,
              fontFamily: "Montserrat-Bold",
            }}
          >
            Agregar de tarjeta
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export const PaymentMethodSaved = ({ item }) => {
  const parseCard = (number) => {
    const subs = number.substring(0, 1);
    const amex = number.substring(0, 2);
    if (subs == 4) {
      return "VISA";
    } else if (subs == 5) {
      return "MasterCard";
    } else if (subs == 6) {
      return "Discover";
    } else if (subs == 8) {
      return "Dhemax";
    } else if (amex == 34 || amex == 37) {
      return "AMEX";
    } else {
      return "Unknown";
    }
  };
  console.log("item", item);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingBottom: 21,
      }}
    >
      <CreditCard></CreditCard>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <CardEllipse />
          <CardEllipse />
          <CardEllipse />
          <CardEllipse />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Montserrat-Semi",
            color: Colors.COMPANY.PRIMARY_DARK,
          }}
        >
          {" "}
          {item.cardNumber.substring(14)}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Montserrat-Semi",
          color: Colors.APP.CARD_GRAY,
        }}
      >
        {parseCard(item.cardNumber)}
      </Text>
      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}
      >
        <CustomButton
          type={"link"}
          text={"Cambiar"}
          underline={"underline"}
        ></CustomButton>
      </View>
    </View>
  );
};
