import { Tabs } from "expo-router";
import { Image } from "expo-image";
import { Colors } from "../../../../constants/colors";
import { StyleSheet, Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="search"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.primary500,
          borderTopWidth: 0,
          elevation: 0,
          height: 72,
        },
        tabBarActiveTintColor: Colors.primary100,
        tabBarInactiveTintColor: Colors.primary700,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: "Poppins-Medium",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={require("../../../../assets/icons/home-icon.svg")}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={require("../../../../assets/icons/search-icon.svg")}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
});
