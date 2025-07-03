"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export const getUserHistory = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return { status: 203, data: [] };

  const history = await db.chat.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return { status: 200, data: history };
};
