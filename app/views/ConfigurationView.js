import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CreditCard from "../components/icons/CreditCard";
import OpenedDoor from "../components/icons/OpenedDoor";
import { Colors } from "../configs/common";
import AddNewCardView from "./AddNewCardView";
import { useNavigation } from "@react-navigation/native";



export const ConfigurationView = () => {
   
  const options = [{ icon: <CreditCard></CreditCard>, text: "Método de pago", route:'PaymentMethod', id:1},{ icon: <OpenedDoor></OpenedDoor>, text: "Cerrar sesión" , route: 'LogOut', id:2}];
  return (
    <SafeAreaView>
      <View style={{ padding: 30 }}>
        <Text
          style={{
            color: Colors.COMPANY.PRIMARY_DARK,
            fontFamily: "Montserrat-Bold",
            fontSize: 20,
          }}
        >
          Configuracion
        </Text>
      </View>
      <View>
      <FlatList
        data={options}
        renderItem={({item}) => <ConfigurationItem item={item}></ConfigurationItem>}
        keyExtractor={item => item.id}
      />
      </View>
    </SafeAreaView>
  );
};

export const ConfigurationItem= ({item})=>{
    const navigation = useNavigation();
    function handleNavigate(){
      if (item.route=='LogOut') {
        return
      }
    navigation.navigate(item.route)
    }
    return (
        <Pressable style={{paddingLeft:50,paddingTop:20, flexDirection:"row", justifyContent: "flex-start", alignItems: "center"}} onPress={handleNavigate}>
            
            {item.icon} 
            <Text> {item.text}</Text>
        </Pressable>
    )
}