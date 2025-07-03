import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserCurrentActiveSubscription } from "@/modules/upgrade/server/upgrade";
import { openai } from "@ai-sdk/openai";
import { generateText, Message, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, id } = await req.json();
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) return new Response("Please login", { status: 401 });
    if (!id || !messages?.length)
      return new Response("Invalid body", { status: 400 });

    // Request limit for free users
    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user) return new Response("User not found", { status: 404 });

    const subscription = await getUserCurrentActiveSubscription();

    if (!subscription) {
      const now = new Date();
      const lastReset = new Date(user.lastReset);
      if (now.getMonth() !== lastReset.getMonth()) {
        await db.user.update({
          where: { id: user.id },
          data: { reqCount: 0, lastReset: now },
        });
      } else if (user.reqCount >= 5) {
        return new Response("Monthly limit exceeded", { status: 429 });
      }
    }

    // Find or create chat
    let chat = await db.chat.findUnique({
      where: { id },
      include: { user: { select: { prompt: true } } },
    });
    if (!chat) {
      const userMsg = messages[messages.length - 1]?.content?.trim() || "";
      const prompt = `Given the user question, generate a concise chat title. If vague, respond: new chat\nUser question: "${userMsg}"`;
      const title =
        (
          await generateText({ model: openai("gpt-3.5-turbo"), prompt })
        ).text?.trim() || "new chat";
      chat = await db.chat.create({
        data: { id, userId: session.user.id, title },
        include: { user: { select: { prompt: true } } },
      });
    }

    const model = !!subscription ? "gpt-4" : "gpt-3.5-turbo";

    // Stream response
    return streamText({
      model: openai(model),
      messages,
      system: chat.user.prompt,
      async onFinish({ text }) {
        const userMsg = messages[messages.length - 1];
        if (userMsg?.content) {
          await db.message.createMany({
            data: [
              {
                role: userMsg.role || "user",
                content: userMsg.content,
                chatid: id,
              },
              { role: "assistant", content: text, chatid: id },
            ],
          });
          if (subscription) {
            await db.user.update({
              where: { id: session.user.id },
              data: { reqCount: { increment: 1 } },
            });
          }
        }
      },
    }).toDataStreamResponse();
  } catch {
    return new Response("Server error", { status: 500 });
  }
}
