import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Chat } from "@/modules/chat/views/chat-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface ChatIdProps {
  params: {
    chatid: string;
  };
}
const ChatId = async ({ params }: ChatIdProps) => {
  const { chatid } = params;
  const messages = await db.message.findMany({
    where: {
      chatid,
    },
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return redirect("/sign-in");
  }
  return <Chat id={chatid} savedMessages={messages} userImgUrl={session.user.image}/>;
};

export default ChatId;
