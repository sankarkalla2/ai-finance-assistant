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

export const getUserInfo = async (userId: string) => {
  try {
    const userInfo = await db.userInfo.findUnique({
      where: {
        userId,
      },
      include: {
        goals: true,
        deptBreakDowns: true,
      },
    });

    return { success: true, data: userInfo, status: 200 };
  } catch (error) {
    console.error("Error fetching user info:", error);
    return { error: "Failed to fetch user information", status: 500 };
  }
};
