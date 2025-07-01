import { View, Text, Modal, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import colors from "@/services/colors";

export default function LoadingDialog({
  visible = false,
  text = "Loading...",
}: any) {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <View
          style={{
            width: 120,
            height: 120,
            padding: 20,
            borderRadius: 15,
            backgroundColor: colors.PRIMARY,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={colors.WHITE} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000070",
  },
  text: {
    marginTop: 10,
    color: colors.WHITE,
    fontSize: 16,
    fontFamily: "poppins",
  },
});
