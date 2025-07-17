import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Chat } from "@/modules/chat/views/chat-view";
import { cache } from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface ChatIdProps {
  params: Promise<{
    chatid: string;
  }>;
}

const getChat = cache(
  async (id: string) =>
    await db.chat.findUnique({
      where: { id },
      select: { title: true, id: true },
    })
);
export async function generateMetadata({
  params,
}: ChatIdProps): Promise<Metadata> {
  const { chatid } = await params;

  const chat = await getChat(chatid);
  return {
    title: chat?.title || "chat",
  };
}
const ChatId = async ({ params }: ChatIdProps) => {
  const { chatid } = await params;
  const chat = await getChat(chatid);
  if (!chat?.id) return notFound();

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
  return (
    <Chat
      id={chatid}
      savedMessages={messages}
      userImgUrl={session?.user.image}
    />
  );
};

export default ChatId;
