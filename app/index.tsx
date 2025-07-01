import { UserContext } from "@/context/UserContext";
import GlobalApi from "@/services/GlobalApi";
import { useLogto } from "@logto/rn";
import { Redirect, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
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
          .then(async (userData) => {
            console.log("User data:", userData);
            if (userData?.email) {
              const result = await GlobalApi.GetUserByEmail(userData?.email);
              console.log(result.data.data, "result.data"); //to Get strapi data in response
              if (!result.data.data) {
                //insert new record
                const data = {
                  email: userData.email,
                  name: userData.name,
                  picture: userData.picture,
                };
                const resp = await GlobalApi.CreateNewUser(data);
                console.log("resp.data", resp.data.data);
                setUser(resp.data.data);
                router.replace("/(tabs)/Home");
              } else {
                setUser(result?.data?.data[0]);
                router.replace("/(tabs)/Home");
              }
            }
          })
          .catch((error) => {
            console.error("Token claims error:", error);
          });
      }, 500);
    }
  }, [getIdTokenClaims, isAuthenticated]);

  // useEffect(() => {
  // const fetchUserData = async () => {
  //   if (isAuthenticated) {
  //     try {
  //       const userData = await getIdTokenClaims();

  //       if (!userData) {
  //         console.warn("No user data returned from getIdTokenClaims");
  //         return;
  //       }

  //       console.log("User data:", userData);

  //       if (userData.email) {
  //         const result = await GlobalApi.GetUserByEmail(userData.email);
  //         console.log(result.data, "result.data");
  //       }
  //     } catch (error) {
  //       console.error("Token claims error:", error);
  //     }
  //   }
  // };

  // Wait a bit longer to ensure Logto is ready
  //   const timer = setTimeout(fetchUserData, 1000);

  //   return () => clearTimeout(timer);
  // }, [getIdTokenClaims, isAuthenticated]);

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
