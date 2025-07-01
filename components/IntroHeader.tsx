import { View, Text, Image, Switch } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "@/services/colors";

export default function IntroHeader() {
  const { user } = useContext(UserContext);
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        {user?.picture ? (
          <Image
            source={{ uri: user?.picture }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 99,
              borderWidth: 1,
              borderColor: colors.PRIMARY,
              //   backgroundColor: colors.PRIMARY,
            }}
          />
        ) : (
          <Image
            source={require("./../assets/images/i4.png")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 99,
              borderWidth: 2,
              borderColor: colors.PRIMARY,
              //   backgroundColor: colors.PRIMARY,
            }}
          />
        )}
        <Text style={{ fontFamily: "poppins-bold", fontSize: 20 }}>
          Hello, {user?.name}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Text style={{ fontFamily: "poppins", fontSize: 16 }}>
          {isEnabled ? "veg" : "Non-veg"}
        </Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
        />
      </View>
    </View>
  );
}
