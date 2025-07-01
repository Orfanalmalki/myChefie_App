import { View, Text } from "react-native";
import React from "react";
import colors from "@/services/colors";

export default function Profile() {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.WHITE,
      }}
    >
      <Text>Profile</Text>
    </View>
  );
}
