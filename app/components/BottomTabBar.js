import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // or any other icon library you prefer
import { PoolMapView } from "../views/PoolMapView";
import { ChargeHistoryView } from "../views/ChargeHistoryView";
const Tab = createBottomTabNavigator();

// Sample views
function View1() {
  return <ChargeHistoryView />;
}

function View2() {
  return <PoolMapView />;
}

function View3() {
  return (
    <View>
      <Text>View 3</Text>
    </View>
  );
}

export const BottomTabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="View2"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "View1") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "View2") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "View3") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="View1" component={View1} />
      <Tab.Screen name="View2" component={View2} />
      <Tab.Screen name="View3" component={View3} />
    </Tab.Navigator>
  );
};
