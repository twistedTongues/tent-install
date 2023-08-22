import { setupURLPolyfill } from "react-native-url-polyfill";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "./screens/HomeScreen";
import TentsNearBy from "./screens/TentsNearByScreen";
import Profile from "./screens/ProfileScreen";

setupURLPolyfill();

export type RootStackParamList = {
  Home: undefined;
  NearBy: undefined;
  Profile: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#F2870D"
        barStyle={{ backgroundColor: "#262626" }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="tent" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="NearBy"
          component={TentsNearBy}
          options={{
            tabBarLabel: "Near By",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="near-me" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Me",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person-outline" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
