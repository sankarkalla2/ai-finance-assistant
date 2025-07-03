import { Chat } from "@/components/chat";
import { generateId, Message } from "ai";

export default async function Page() {
  const id = generateId();


  return <Chat id={id} />;
}
