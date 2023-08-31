import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBar } from "../components/BackBar";
import { CustomButton } from "../components/CustomButton";
import CardEllipse from "../components/icons/CardEllipse";
import CreditCard from "../components/icons/CreditCard";
import Plus from "../components/icons/Plus";
import { Colors, tra } from "../configs/common";
import { load } from "../utils/saveLoadData";

export const PaymentMethodView = () => {
  const [cards, setCards] = useState([]);
  const fetchData = useCallback(async () => {
    const data = await load({ what: "cards" });
    if (data !== "no data") {
      setCards(data);
    } else {
      setCards([]); // Asegúrate de actualizar a un array vacío si no hay datos
    }
  }, []);
  useEffect(() => {
    fetchData();

  }, [fetchData]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData()
    }, [cards])
  );
  const navigation = useNavigation();
  function handleNavigateToPayment() {
    navigation.navigate("AddPayment");
  }

  return (
    <SafeAreaView>
      <BackBar text1={tra("metodopago", "titulo")}></BackBar>

      <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
        <View style={{ paddingBottom: 42, gap: 10 }}>
          <FlatList
            data={cards}
            renderItem={({ item }) => (
              <PaymentMethodSaved item={item}></PaymentMethodSaved>
            )}
            keyExtractor={(item) => item.id}
            extraData={cards}
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
            {tra("metodopago", "agregar")}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

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
export const PaymentMethodSaved = ({ item }) => {
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
          text={tra("metodopago", "cambiar")}
          underline={"underline"}
        ></CustomButton>
      </View>
    </View>
  );
};
