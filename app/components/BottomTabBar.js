import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Colors } from "../configs/common";
import { ChargeHistoryView } from "../views/ChargeHistoryView";
import { PoolMapView } from "../views/PoolMapView";
import ConfigIcon from "./icons/config_icon";
import HistorialIcon from "./icons/historial_icon";
import MapIcon from "./icons/map_icon";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PoolDetailView } from "../views/PoolDetailView";
import { StartStopChargeView } from "../views/StartStopChargeView";
import AddNewCardView, { NewCardView } from "../views/AddNewCardView";
import { v4 as uuidv4 } from "uuid";

const Tab = createBottomTabNavigator();
const MapStack = createNativeStackNavigator();

function PoolMapStack() {
  return (
    <MapStack.Navigator initialRouteName="PoolMapMain">
      <MapStack.Screen
        name="PoolMapMain"
        component={PoolMapView}
        options={{ headerShown: false }}
      />
      <MapStack.Screen
        name="PoolDetail"
        component={PoolDetailView}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
        }}
      />
      <MapStack.Screen
        name="ChargeScreen"
        component={StartStopChargeView}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
        }}
      />
    </MapStack.Navigator>
  );
}

// Sample views
function View1() {
  return <ChargeHistoryView />;
}

function View2() {
  return <PoolMapView />;
}

function View3() {
  return (
   <AddNewCardView></AddNewCardView>
  );
}

export const BottomTabBar = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName="Mapa"
    >
      <Tab.Screen
        name="Historial"
        component={View1}
        options={{
          contentStyle: { backgroundColor: "white" },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={PoolMapStack}
        options={{
          contentStyle: { backgroundColor: "white" },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Config"
        component={View3}
        options={{
          contentStyle: { backgroundColor: "white" },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 121,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const renderIcon = (routeName, isFocused) => {
          let color = isFocused ? "white" : Colors.COMPANY.PRIMARY;
          switch (routeName) {
            case "Mapa":
              return <MapIcon fill={color} />;
            case "Historial":
              return <HistorialIcon fill={color} />;
            case "Config":
              return <ConfigIcon fill={color} />;
            default:
              return null;
          }
        };

        return (
          <View style={{ flex: 1 }} key={uuidv4()}>
            <View
              style={{
                flex: 1,
                backgroundColor: isFocused
                  ? Colors.COMPANY.PRIMARY_DARK
                  : "white",
                borderRadius: 14,
                marginVertical: 10,
                marginHorizontal: 23,
              }}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {renderIcon(route.name, isFocused)}
                <Text
                  style={{
                    color: isFocused ? "white" : Colors.COMPANY.PRIMARY_DARK,
                    fontFamily: "Montserrat-Semi",
                    fontSize: 15,
                    paddingTop: 5,
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            </View>
          </View>
        );
      })}
    </View>
  );
}
