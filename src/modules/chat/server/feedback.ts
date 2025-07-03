"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export const submitFeedback = async (feedback: string, reaction: number) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user)
    return { status: 401, message: "Please login to sumit feedback" };

  const res = await db.feedback.create({
    data: {
      feedback,
      reaction,
      userId: session.user.id,
    },
  });
  if (res.id) return { status: 200, message: "Feedback submitted" };
  return { status: 500, message: "Failed to submit feedback" };
};
