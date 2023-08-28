import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NewCardForm } from "../components/AddNewCardForm"; // Adjust the path based on your project structure
import { BackBar } from "../components/BackBar";
const AddNewCardView = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Load data from AsyncStorage on app start
    loadData();
  }, []);

  const saveNewCardToLocalStorage = async (cardData) => {
    try {
      // Retrieve the existing cards array or initialize it if it doesn't exist
      const existingCardsData = await AsyncStorage.getItem("cards");
      const existingCards = existingCardsData
        ? JSON.parse(existingCardsData)
        : [];

      // Create the card object format you want
      const cardObject = {
        [`card${existingCards.length + 1}`]: cardData,
      };

      // Add the new card to the array
      existingCards.push(cardObject);

      // Store the updated array in AsyncStorage
      await AsyncStorage.setItem("cards", JSON.stringify(existingCards));
    } catch (error) {
      console.error("Error saving card data:", error);
    }
  };

  const loadData = async () => {
    try {
      // Load data from AsyncStorage
      const data = await AsyncStorage.getItem("formData");
      if (data) {
        setFormData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  const logExistingCards = async () => {
    try {
      const cardsData = await AsyncStorage.getItem("cards");

      // If there's data stored in 'cards' item
      if (cardsData) {
        const cardsArray = JSON.parse(cardsData);
        console.log(cardsArray);
      } else {
        console.log("No cards found in local storage.");
      }
    } catch (error) {
      console.error("Error fetching and parsing cards data:", error);
    }
  };
  logExistingCards();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackBar text1={"Agregar tarjeta nueva"}/>
      <View style={{ padingHorizontal: 10 }}>
        <NewCardForm onSave={saveNewCardToLocalStorage} />
      </View>
    </SafeAreaView>
  );
};
export default AddNewCardView;
