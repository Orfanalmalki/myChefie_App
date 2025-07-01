import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import { Marquee } from "@animatereactnative/marquee";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import colors from "@/services/colors";
import { useLogto } from "@logto/rn";

export default function Landing() {
  const { signIn, signOut, isAuthenticated } = useLogto();

  const imageList = [
    require("./../assets/images/1.jpg"),
    require("./../assets/images/c1.jpg"),
    require("./../assets/images/2.jpg"),
    require("./../assets/images/c2.jpg"),
    require("./../assets/images/3.jpg"),
    require("./../assets/images/c3.jpg"),
    require("./../assets/images/4.jpg"),
    require("./../assets/images/5.jpg"),
    require("./../assets/images/6.jpg"),
  ];
  return (
    <GestureHandlerRootView>
      <Marquee
        spacing={10}
        speed={0.6}
        style={{ transform: [{ rotate: "-4deg" }], marginTop: 10 }}
      >
        <View style={styles.imageContainer}>
          {imageList.map((image, index) => (
            <Image key={index} source={image} style={styles.image} />
          ))}
        </View>
      </Marquee>
      <Marquee
        spacing={10}
        speed={0.4}
        reverse={true}
        style={{ transform: [{ rotate: "-4deg" }], marginTop: 10 }}
      >
        <View style={styles.imageContainer}>
          {imageList.map((image, index) => (
            <Image key={index} source={image} style={styles.image} />
          ))}
        </View>
      </Marquee>
      <Marquee
        spacing={10}
        speed={0.5}
        style={{ transform: [{ rotate: "-4deg" }], marginTop: 10 }}
      >
        <View style={styles.imageContainer}>
          {imageList.map((image, index) => (
            <Image key={index} source={image} style={styles.image} />
          ))}
        </View>
      </Marquee>
      <View
        style={{
          backgroundColor: colors.WHITE,
          height: "100%",
          padding: 30,
        }}
      >
        <Text
          style={{
            fontFamily: "poppins-bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          My Chefie App 🍔🔎 | Find, Create & Enjoy Delicious Recipes!
        </Text>
        <Text
          style={{
            fontFamily: "poppins",
            fontSize: 17,
            textAlign: "center",
            color: colors.GRAY,
            marginTop: 7,
          }}
        >
          Generate delicious recipes in seconds with the power of AI!
        </Text>
        <TouchableOpacity
          // onPress={async () => signIn("mychefie://callback")}
          onPress={async () => {
            try {
              await signIn("exp://145.94.159.5:8081");
            } catch (err) {
              console.error("Sign-in failed:", err);
            }
          }}
          style={styles.button}
        >
          <Text
            style={{
              fontFamily: "poppins",
              fontSize: 17,
              textAlign: "center",
              color: colors.WHITE,
            }}
          >
            Get Started hello
          </Text>
        </TouchableOpacity>
        <Button title="Sign out" onPress={async () => signOut()} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 160,
    borderRadius: 25,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
});
