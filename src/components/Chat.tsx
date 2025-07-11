import { XStack, YStack, Text, Button, Input } from "tamagui";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { useMutation } from "convex/react";

function Chat() {
  const messages = useQuery(api.myFunctions.getMessages);
  const sendMessage = useMutation(api.myFunctions.sendMessage);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  return (
    <YStack
      justify="center"
      items="center"
      height="100vh"
      width={"100%"}
      p={24}
    >
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

export default Chat;
