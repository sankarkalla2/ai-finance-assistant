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

    // const account = await db.user.findUnique({
    //   where: {
    //     id: session.user.id,
    //   },
    //   select: {
    //     id: true,
    //   },
    // });
    // if (!account) return { status: 404, message: "User not foudn" };

    // await db.user.delete({
    //   where: {
    //     id: account.id,u
    //   },
    //   select: {
    //     id: true,
    //   },
    // });
    const res = await auth.api.deleteUser({ body: {} });
    if (res.success) {
      return { status: 200, message: res.message };
    }
    return { status: 400, message: res.message };
  } catch (error) {
    return { status: 500, mesasge: "Internel server error." };
  }
};

export const isUserExisted = async (email: string) => {
  try {
    const isUserExisted = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (isUserExisted) {
      return { status: 200, isUserExisted: true };
    }
    return { status: 404, isUserExisted: false };
  } catch (error) {
    return {
      status: 500,
      isUserExisted: false,
      message: "Internal server error.",
    };
  }
};
