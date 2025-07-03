"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export const deleteUserAccont = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) return { status: 401, message: "You are autheticed." };

    const account = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
      },
    });
    if (!account) return { status: 404, message: "User not foudn" };

    await db.user.delete({
      where: {
        id: account.id,
      },
      select: {
        id: true,
      },
    });
    return { status: 200, message: "Account deleted successfully" };
  } catch (error) {
    return { status: 500, mesasge: "Internel server error." };
  }
};
