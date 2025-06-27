import { Chat } from "@/modules/chat/views/chat-view";
import { generateId } from "ai";

const ChatPage = () => {
  const id = generateId();
  return <Chat id={id} />;
};

export default ChatPage;
