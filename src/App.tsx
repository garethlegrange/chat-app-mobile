import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { defaultConfig } from "@tamagui/config/v4";
import { XStack, YStack, Text, Button, H6, Input } from "tamagui";
import { Authenticated, Unauthenticated } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
// import { useMutation } from "convex/react";

// you usually export this from a tamagui.config.ts file
const config = createTamagui(defaultConfig);

type Conf = typeof config;

// make imports typed
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

function App() {
  const messages = useQuery(api.myFunctions.getMessages);
  // const sendMessage = useMutation(api.myFunctions.sendMessage);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  return (
    <TamaguiProvider config={config}>
      <Unauthenticated>
        <YStack
          justify="center"
          items="center"
          height="100vh"
          width={"100%"}
          p={24}
        >
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
          Welcome back! <UserButton />
          {messages && messages.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {messages.map((message) => (
                <li key={message._id}>
                  <p>{message.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 py-8">No messages</div>
          )}
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();

              setIsSending(true);

              // sendMessage({ message }).finally(() => {
              //   setIsSending(false);
              // });

              setMessage("");
            }}
          >
            <XStack items="center" gap="$2" width="100%">
              <Input
                flex={1}
                value={message}
                onChangeText={setMessage}
                placeholder="Type your message..."
              />
              <Button size="$4" themeInverse>
                {isSending ? "Sending..." : "Send"}
              </Button>
            </XStack>
          </form>
        </YStack>
      </Authenticated>
    </TamaguiProvider>
  );
}

export default App;
