import { Chat } from "@/modules/chat/views/chat-view";
import { generateId } from "ai";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Chat-AskYourFinance",
  },
  description: "Chat with AskYourFinance AI Assistant",
};
const ChatPage = () => {
  const id = generateId();
  return <Chat id={id} userImgUrl={""} />;
};

export default ChatPage;
