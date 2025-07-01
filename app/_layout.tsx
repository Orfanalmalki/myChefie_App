import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { LogtoProvider, LogtoConfig, UserScope } from "@logto/rn";
import { UserContext } from "@/context/UserContext";
import { useState } from "react";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "poppins": require("./../assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("./../assets/fonts/Poppins-Bold.ttf"),
  });

  const config: LogtoConfig = {
    endpoint: "https://8ukzaq.logto.app/",
    appId: "w2a156bkzv0yvrucawlgp",
    scopes: [UserScope.Email],
  };

  const [user, setUser] = useState();
  if (!loaded) {
    return null; // Or <AppLoading />
  }
  return (
    <LogtoProvider config={config}>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack>
          <Stack.Screen
            name="landing"
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack>
      </UserContext.Provider>
    </LogtoProvider>
  );
}
