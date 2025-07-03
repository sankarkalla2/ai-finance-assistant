"use server";

import { z } from "zod";
import { formSchema } from "../lib/onboarding-form-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { generateAIAssistantPrompt } from "@/lib/utils/ai-assistant-prompt";

export const onboardNewUser = async (data: z.infer<typeof formSchema>) => {
  const parsedContent = formSchema.safeParse(data);
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
            gender: formData.personalInfo.gender,
            maritalStatus: formData.personalInfo.maritalStatus,
            location: formData.personalInfo.location,

            // Income
            primaryIncome: formData.income.primaryIncome,
            occupation: formData.income.occupation,
            jobType: formData.income.jobType,
            extraIncome: formData.income.extraIncome,
            incomeFrequency: formData.income.incomeFrequency,

            // Assets
            cashSavings: formData.assets.cashSavings,
            investments: formData.assets.investments,
            realEstate: formData.assets.realEstate,
            vehicles: formData.assets.vehicles,
            otherAssets: formData.assets.otherAssets,
            liquidAssets: formData.assets.liquidAssets,

            // Debts
            creditCardDebt: formData.debts.creditCardDebt,
            otherLiabilities: formData.debts.otherLiabilities,

            // Mortgage
            mortgageBalance: formData.debts.mortgage.balance,
            mortgageInterestRate: formData.debts.mortgage.interestRate,
            mortgageMonthlyPayment: formData.debts.mortgage.monthlyPayment,
            mortgageYearsLeft: formData.debts.mortgage.yearsLeft,

            // Expenses
            housing: formData.expenses.housing,
            utilities: formData.expenses.utilities,
            insurance: formData.expenses.insurance,
            food: formData.expenses.food,
            transportation: formData.expenses.transportation,
            healthcare: formData.expenses.healthcare,
            education: formData.expenses.education,
            entertainment: formData.expenses.entertainment,
            personalCare: formData.expenses.personalCare,
            childcare: formData.expenses.childcare,
            miscellaneous: formData.expenses.miscellaneous,

            // Lifestyle
            spendingHabits: formData.lifestyle.spendingHabits,
            carType: formData.lifestyle.carPreferences.type,
            carNewOrUsed: formData.lifestyle.carPreferences.newOrUsed,
            carBudget: formData.lifestyle.carPreferences.budget,
            carBrandPreference:
              formData.lifestyle.carPreferences.brandPreference,
            carFinancingPreference:
              formData.lifestyle.carPreferences.financingPreference,

            // Additional Context
            creditScore: formData.additionalContext.creditScore,
            jobStability: formData.additionalContext.jobStability,
            retirementAge: formData.additionalContext.retirementAge,
            emergencyFundMonths: formData.additionalContext.emergencyFundMonths,
            taxRate: formData.additionalContext.taxRate,
            riskTolerance: formData.goals.riskTolerance,

            // Update related data
            dependents: {
              deleteMany: {},
              create: formData.personalInfo.dependents.map((dependent) => ({
                name: dependent.name,
                age: dependent.age,
                relationship: dependent.relationship,
              })),
            },
            loans: {
              deleteMany: {},
              create: formData.debts.loans.map((loan) => ({
                type: loan.type,
                balance: loan.balance,
                interestRate: loan.interestRate,
                monthlyPayment: loan.monthlyPayment,
                remainingTerm: loan.remainingTerm,
              })),
            },
            existingEMIs: {
              deleteMany: {},
              create: formData.debts.existingEMIs.map((emi) => ({
                purpose: emi.purpose,
                amount: emi.amount,
                duration: emi.duration,
              })),
            },
            shortTermGoals: {
              deleteMany: {},
              create: formData.goals.shortTermGoals.map((goal) => ({
                description: goal.description,
                targetAmount: goal.targetAmount,
                timeline: goal.timeline,
                priority: goal.priority,
                type: "short",
              })),
            },
            longTermGoals: {
              deleteMany: {},
              create: formData.goals.longTermGoals.map((goal) => ({
                description: goal.description,
                targetAmount: goal.targetAmount,
                timeline: goal.timeline,
                priority: goal.priority,
                type: "long",
              })),
            },
            plannedPurchases: {
              deleteMany: {},
              create: formData.lifestyle.plannedPurchases.map((purchase) => ({
                item: purchase.item,
                estimatedCost: purchase.estimatedCost,
                timeline: purchase.timeline,
              })),
            },
          },
        }),

        db.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            prompt: assistantPrompt,
          },
        }),
      ]);

      return { success: true, data: updatedInfo, status: 200 };
    } else {
      // Create new user info

      const [newUserinfo, _] = await db.$transaction([
        db.userInfo.create({
          data: {
            userId: session.user.id,

            // Personal Info
            name: formData.personalInfo.name,
            age: formData.personalInfo.age,
            gender: formData.personalInfo.gender,
            maritalStatus: formData.personalInfo.maritalStatus,
            location: formData.personalInfo.location,

            // Income
            primaryIncome: formData.income.primaryIncome,
            occupation: formData.income.occupation,
            jobType: formData.income.jobType,
            extraIncome: formData.income.extraIncome,
            incomeFrequency: formData.income.incomeFrequency,

            // Assets
            cashSavings: formData.assets.cashSavings,
            investments: formData.assets.investments,
            realEstate: formData.assets.realEstate,
            vehicles: formData.assets.vehicles,
            otherAssets: formData.assets.otherAssets,
            liquidAssets: formData.assets.liquidAssets,

            // Debts
            creditCardDebt: formData.debts.creditCardDebt,
            otherLiabilities: formData.debts.otherLiabilities,

            // Mortgage
            mortgageBalance: formData.debts.mortgage.balance,
            mortgageInterestRate: formData.debts.mortgage.interestRate,
            mortgageMonthlyPayment: formData.debts.mortgage.monthlyPayment,
            mortgageYearsLeft: formData.debts.mortgage.yearsLeft,

            // Expenses
            housing: formData.expenses.housing,
            utilities: formData.expenses.utilities,
            insurance: formData.expenses.insurance,
            food: formData.expenses.food,
            transportation: formData.expenses.transportation,
            healthcare: formData.expenses.healthcare,
            education: formData.expenses.education,
            entertainment: formData.expenses.entertainment,
            personalCare: formData.expenses.personalCare,
            childcare: formData.expenses.childcare,
            miscellaneous: formData.expenses.miscellaneous,

            // Lifestyle
            spendingHabits: formData.lifestyle.spendingHabits,
            carType: formData.lifestyle.carPreferences.type,
            carNewOrUsed: formData.lifestyle.carPreferences.newOrUsed,
            carBudget: formData.lifestyle.carPreferences.budget,
            carBrandPreference:
              formData.lifestyle.carPreferences.brandPreference,
            carFinancingPreference:
              formData.lifestyle.carPreferences.financingPreference,

            // Additional Context
            creditScore: formData.additionalContext.creditScore,
            jobStability: formData.additionalContext.jobStability,
            retirementAge: formData.additionalContext.retirementAge,
            emergencyFundMonths: formData.additionalContext.emergencyFundMonths,
            taxRate: formData.additionalContext.taxRate,
            riskTolerance: formData.goals.riskTolerance,

            // Create related data
            dependents: {
              create: formData.personalInfo.dependents.map((dependent) => ({
                name: dependent.name,
                age: dependent.age,
                relationship: dependent.relationship,
              })),
            },
            loans: {
              create: formData.debts.loans.map((loan) => ({
                type: loan.type,
                balance: loan.balance,
                interestRate: loan.interestRate,
                monthlyPayment: loan.monthlyPayment,
                remainingTerm: loan.remainingTerm,
              })),
            },
            existingEMIs: {
              create: formData.debts.existingEMIs.map((emi) => ({
                purpose: emi.purpose,
                amount: emi.amount,
                duration: emi.duration,
              })),
            },
            shortTermGoals: {
              create: formData.goals.shortTermGoals.map((goal) => ({
                description: goal.description,
                targetAmount: goal.targetAmount,
                timeline: goal.timeline,
                priority: "low",
                type: "short",
              })),
            },
            longTermGoals: {
              create: formData.goals.longTermGoals.map((goal) => ({
                description: goal.description,
                targetAmount: goal.targetAmount,
                timeline: goal.timeline,
                priority: goal.priority,
                type: "long",
              })),
            },
            plannedPurchases: {
              create: formData.lifestyle.plannedPurchases.map((purchase) => ({
                item: purchase.item,
                estimatedCost: purchase.estimatedCost,
                timeline: purchase.timeline,
              })),
            },
          },
        }),

        db.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            prompt: assistantPrompt,
          },
        }),
      ]);
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
        dependents: true,
        loans: true,
        existingEMIs: true,
        shortTermGoals: true,
        longTermGoals: true,
        plannedPurchases: true,
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
