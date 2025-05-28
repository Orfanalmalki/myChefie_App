import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { LogtoProvider, LogtoConfig, UserScope } from "@logto/rn";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    poppins: require("./../assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("./../assets/fonts/Poppins-Bold.ttf"),
  });

  const config: LogtoConfig = {
    endpoint: "https://8ukzaq.logto.app/",
    appId: "w2a156bkzv0yvrucawlgp",
    scopes: [UserScope.Email],
  };

  return (
    <LogtoProvider config={config}>
      <Stack>
        <Stack.Screen
          name="landing"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </LogtoProvider>
  );
}
