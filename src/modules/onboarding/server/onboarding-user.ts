"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  generateAIAssistantPrompt,
  generatePreviewQuestions,
} from "@/lib/utils/ai-assistant-prompt";

import { headers } from "next/headers";
import { leanFormSchema } from "../lib/onboarding-form";

export const onboardNewUser = async (data: z.infer<typeof leanFormSchema>) => {
  const parsedContent = leanFormSchema.safeParse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { error: "You not authenticated", status: 401 };
  }

  if (!parsedContent.success) {
    return { error: "Invalid form data", status: 400 };
  }

  const onboardingInfo = await db.userInfo.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
    },
  });

  const formData = parsedContent.data;
  const assistantPrompt = generateAIAssistantPrompt(data);
  const previewQuestions = await generatePreviewQuestions(data);

  try {
    if (onboardingInfo) {
      // Update existing user info

      const [updatedInfo, _] = await db.$transaction([
        db.userInfo.update({
          where: {
            id: onboardingInfo.id,
          },
          data: {
            // Personal Info
            name: formData.personalInfo.name,
            age: formData.personalInfo.age,
            country: formData.personalInfo.country,
            state: formData.personalInfo.state,

            // Income
            totalIncome: formData.income.monthlyIncome,
            occupation: formData.income.occupation,
            incomeFrequency: formData.income.incomeFrequency,

            // Assets
            cashSavings: formData.assets.cashSavings,
            investments: formData.assets.investments,
            retirementSavings: formData.assets.retirementSavings,
            realEstateVAlue: formData.assets.realEstateValue,

            //debts
            totalDebt: formData.debts.totalDebt,
            monthlyDebtPayment: formData.debts.monthlyDebtPayment,
            creditScore: formData.debts.creditScore,
            deptBreakDowns: {
              deleteMany: {},
              create: formData.debts.deptBreakDown.map((d) => ({
                type: d.type,
                totalDebt: d.totalDebt,
                balance: d.balance,
              })),
            },

            // Expenses
            housing: formData.expenses.housing,
            food: formData.expenses.food,
            transportation: formData.expenses.transportation,
            totalMonthlyExpenses: formData.expenses.totalMonthlyExpenses,
            subscription: formData.expenses.subscriptions,
            education: formData.expenses.education,
            miscellaneous: formData.expenses.miscallaneous,
            

            // Lifestyle
            spendingHabits: formData.lifestyle.spendingHabits,
            plannedPurchases: formData.lifestyle.plannedBigPurchases.map(
              (p) => p.description
            ),

            emergencyFundMonthsCovered: formData.emergencyFund.monthsCovered,

            //goals
            goals: {
              deleteMany: {},
              create: formData.goals.goals.map((g) => ({
                targetAmount: g.targetAmount,
                description: g.description,
                priority: g.priority,
                timeline: g.timeline,
              })),
            },
            riskTolerance: formData.goals.riskTolerance,
            retirementAge: formData.goals.retirementAge,
          },
        }),

        db.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            prompt: assistantPrompt,
            PreviewQuestions: {
              deleteMany: {},
              create: previewQuestions.map((question: string) => ({
                question,
              })),
            },
          },
        }),
      ]);

      return { success: true, data: updatedInfo, status: 200 };
    } else {
      // Create new user info

      console.log("has to create new user");
      const [newUserinfo] = await db.$transaction([
        db.userInfo.create({
          data: {
            // Personal Info
            userId: session.user.id,
            name: formData.personalInfo.name,
            age: formData.personalInfo.age,
            country: formData.personalInfo.country,
            state: formData.personalInfo.state,
            maritalStatus: "unmarried",
            dependents: formData.personalInfo.dependents,

            // Income
            totalIncome: formData.income.monthlyIncome,
            occupation: formData.income.occupation,
            incomeFrequency: formData.income.incomeFrequency,

            // Assets
            cashSavings: formData.assets.cashSavings,
            investments: formData.assets.investments,
            retirementSavings: formData.assets.retirementSavings,
            realEstateVAlue: formData.assets.realEstateValue,

            //debts
            totalDebt: formData.debts.totalDebt,
            monthlyDebtPayment: formData.debts.monthlyDebtPayment,
            creditScore: formData.debts.creditScore,
            deptBreakDowns: {
              create: formData.debts.deptBreakDown.map((d) => ({
                type: d.type,
                totalDebt: d.totalDebt,
                balance: d.balance,
              })),
            },

            // Expenses
            housing: formData.expenses.housing,
            food: formData.expenses.food,
            transportation: formData.expenses.transportation,
            totalMonthlyExpenses: formData.expenses.totalMonthlyExpenses,
            subscription: formData.expenses.subscriptions,
            education: formData.expenses.education,
            miscellaneous: formData.expenses.miscallaneous,

            // Lifestyle
            spendingHabits: formData.lifestyle.spendingHabits,
            plannedPurchases: formData.lifestyle.plannedBigPurchases.map(
              (p) => p.description
            ),

            emergencyFundMonthsCovered: formData.emergencyFund.monthsCovered,

            //goals
            goals: {
              create: formData.goals.goals.map((g) => ({
                targetAmount: g.targetAmount,
                description: g.description,
                priority: g.priority,
                timeline: g.timeline,
              })),
            },
            riskTolerance: formData.goals.riskTolerance,
            retirementAge: formData.goals.retirementAge,
          },
        }),

        db.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            prompt: assistantPrompt,
            PreviewQuestions: {
              deleteMany: {},
              create: previewQuestions.map((question) => ({
                question,
              })),
            },
          },
        }),
      ]);
      console.log("New user info created:", newUserinfo);
      return { success: true, data: newUserinfo, status: 201 };
    }
  } catch (error) {
    console.error("Error onboarding user:", error);
    return { error: "Failed to save user information", status: 500 };
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

export const hasCompletedOnboarding = async (userId: string) => {
  try {
    const userInfo = await db.userInfo.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    return { success: true, completed: !!userInfo, status: 200 };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return { error: "Failed to check onboarding status", status: 500 };
  }
};

export const getUserPreviewQuestions = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return { status: 400, data: [] };

  const previewQuestions = await db.previewQuestions.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      question: true,
    },
  });

  return { status: 200, data: previewQuestions };
};
