import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import colors from "@/services/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Button({
  label,
  onPress,
  icon = "",
  loading = false,
}: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={{
        backgroundColor: colors.PRIMARY,
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator size={25} color={colors.WHITE} />
      ) : (
        <Ionicons name={icon} size={20} color="white" />
      )}

      <Text
        style={{
          fontFamily: "poppins",
          fontSize: 17,
          textAlign: "center",
          color: colors.WHITE,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
