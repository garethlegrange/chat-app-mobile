import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { defaultConfig } from "@tamagui/config/v4";
import { XStack, YStack, Text, Button, H6 } from "tamagui";
import { Authenticated, Unauthenticated } from "convex/react";
import { Chat } from "./components/Chat";

// you usually export this from a tamagui.config.ts file
const config = createTamagui(defaultConfig);

type Conf = typeof config;

// make imports typed
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

function App() {
  return (
    <TamaguiProvider config={config}>
      <Unauthenticated>
        <YStack justify="center" items="center" height="100vh" width={"100%"}>
          <YStack gap="$3" items="center" p={24}>
            <H6>Welcome to KYC (Know Your Customer) app</H6>
            <Text>
              Please sign in to start a chat or sign up if you don't have an
              account.
            </Text>
            <XStack gap="$2" mt="$3" justify="center" items="center">
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button themeInverse>Sign Up</Button>
              </SignUpButton>
            </XStack>
            <Text>
              <a
                href="https://github.com/garethlegrange/chat-app-mobile"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0070f3", textDecoration: "underline" }}
              >
                View project on GitHub
              </a>
            </Text>
          </YStack>
        </YStack>
      </Unauthenticated>

      <Authenticated>
        <YStack
          justify="center"
          items="center"
          height="100vh"
          width={"100%"}
          p={24}
        >
          <Chat />

          <Text>
            <a
              href="https://github.com/garethlegrange/chat-app-mobile"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0070f3", textDecoration: "underline" }}
            >
              View project on GitHub
            </a>
          </Text>
        </YStack>
      </Authenticated>
    </TamaguiProvider>
  );
}

export default App;
