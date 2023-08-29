import { useNavigation } from "@react-navigation/native";

export const navigate = ({ path }) => {
  const navigation = useNavigation();
  navigation.navigate(path);
};
