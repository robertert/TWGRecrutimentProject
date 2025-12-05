import DetailsScreen from "../app/(app)/(stack)/video/[id]/details";
import NotesScreen from "../app/(app)/(stack)/video/[id]/notes";
import { Colors } from "../constants/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const VideoTabs = createMaterialTopTabNavigator();

export default function VideoTabsComponent() {
  return (
    <VideoTabs.Navigator
      backBehavior="none"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primary700,
          height: 2,
          top: 23,
        },
        tabBarActiveTintColor: Colors.primary700,
        tabBarInactiveTintColor: Colors.primary700,
        tabBarLabelStyle: {
          fontFamily: "Poppins-SemiBold",
          fontSize: 12,
          textTransform: "none",
          marginTop: 0,
          marginBottom: 0,
        },
        tabBarItemStyle: {
          height: 23,
          justifyContent: "flex-start",
          paddingVertical: 5,
        },
        tabBarStyle: {
          height: 25,
          borderTopColor: Colors.secondary,
          backgroundColor: Colors.primary100,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 2,
          borderBottomColor: Colors.secondary,
        },
      }}
    >
      <VideoTabs.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: "Details",
          lazy: false,
        }}
      />
      <VideoTabs.Screen
        name="Notes"
        component={NotesScreen}
        options={{ title: "Notes" }}
      />
    </VideoTabs.Navigator>
  );
}
