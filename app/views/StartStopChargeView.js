import { Text, Pressable, View } from "react-native";

export const StartStopChargeView = ({ route }) => {
  const { connector } = route.params;
  const handleStartCharge = () => {
    console.log("Starting charge for connector", connector.id);
  };
  return (
    <View>
      <Text>connector.connector_name</Text>
      <Pressable onPress={handleStartCharge}>Iniciar carga</Pressable>
    </View>
  );
};
