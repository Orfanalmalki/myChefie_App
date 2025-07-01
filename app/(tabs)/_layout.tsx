import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./../../assets/images/i1.png")}
              style={{ width: size, height: size, opacity: focused ? 1 : 0.4 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./../../assets/images/i2.png")}
              style={{ width: size, height: size, opacity: focused ? 1 : 0.4 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Cookbook"
        options={{
          title: "Cookbook",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./../../assets/images/i3.png")}
              style={{ width: size, height: size, opacity: focused ? 1 : 0.4 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./../../assets/images/i4.png")}
              style={{ width: size, height: size, opacity: focused ? 1 : 0.4 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
