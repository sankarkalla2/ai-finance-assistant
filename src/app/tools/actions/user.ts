"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export const getUserForCanIafford = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return { status: 401 };

  const userInfo = await db.userInfo.findUnique({
    where: {
      userId: session.user.id,
    },

    select: {
      monthlyIncome: true,
      extraIncome: true,
      totalDebt: true,
      totalMonthlyExpenses: true,
      monthlyDebtPayment: true,
    },
  });

  return { status: 200, userInfo };
};
