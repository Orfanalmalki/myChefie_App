import { useLogto } from "@logto/rn";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();
  console.log(isAuthenticated, "isAuthenticated");
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     console.log(isAuthenticated);
  //     getIdTokenClaims().then((userData) => {
  //       console.log(userData);
  //     });
  //   }
  //   console.log(isAuthenticated, "hellooo");
  // }, [getIdTokenClaims, isAuthenticated]);
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        getIdTokenClaims()
          .then((userData) => {
            console.log("User data:", userData);
          })
          .catch((error) => {
            console.error("Token claims error:", error);
          });
      }, 500);
    }
  }, [getIdTokenClaims, isAuthenticated]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Redirect href="../landing" />
    </View>
  );
}
