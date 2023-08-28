import AsyncStorage from "@react-native-async-storage/async-storage";

export const save = async ({ where, what, push = false }) => {
  try {
    const item_exists = await AsyncStorage.getItem(where);
    if (push) {
      const existing_array = item_exists ? JSON.parse(item_exists) : [];
      existing_array.push(what);

      await AsyncStorage.setItem(where, JSON.stringify(existing_array));
    } else {
      await AsyncStorage.setItem(where, JSON.stringify(what));
    }
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const load = async ({ what }) => {
  const data = await AsyncStorage.getItem(what);
  if (data) {
    return JSON.parse(data);
  } else {
    return "no data";
  }
};

export const remove = async ({ what }) => {
  try {
    await AsyncStorage.removeItem(what);
  } catch (error) {
    console.error("Error removing data:", error);
  }
};
