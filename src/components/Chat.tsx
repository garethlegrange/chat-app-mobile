import {
  XStack,
  YStack,
  Button,
  Input,
  ScrollView,
  ListItem,
  Text,
} from "tamagui";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useRef, useEffect } from "react";
import { useMutation } from "convex/react";
import { UserButton } from "@clerk/clerk-react";

export function Chat() {
  const messages = useQuery(api.myFunctions.getMessages);
  const sendMessage = useMutation(api.myFunctions.sendMessage);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollViewRef = useRef<any>(null); // Use 'any' for compatibility with Tamagui ScrollView

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current && messages && messages.length > 0) {
      setTimeout(() => {
        const ref = scrollViewRef.current;
        if (ref && typeof ref.scrollTo === 'function') {
          ref.scrollTo({ y: 999999, animated: true });
        }
      }, 100);
    }
  }, [messages]);

  return (
    <YStack
      justify="center"
      items="center"
      height="100vh"
      width={"100%"}
      py={24}
      gap={"$3"}
    >
        <UserButton />
      {messages && messages.length > 0 ? (
        <ScrollView
          width="100%"
          height="100%"
          ref={scrollViewRef}
        >
          <YStack width="100%" gap="$2">
            {messages.map((message) => {
              return (
                <ListItem key={message._id} rounded="lg" width="75%" ml={message.sender_type === "client" ? "auto" : 0}>
                  <Text>{message.content}</Text>
                </ListItem>
              );
            })}
          </YStack>
        </ScrollView>
      ) : (
        <div className="text-center text-gray-500 py-8">No messages</div>
      )}
      <form
        style={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();

          setIsSending(true);

          sendMessage({ message }).finally(() => {
            setIsSending(false);
          });

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
  );
}
