import { z } from "zod";

export const leanFormSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "Name is required"),
    age: z
      .number()
      .min(18, "Age must be at least 18")
      .max(100, "Age must be less than 100"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required").optional(),
    dependents: z.number().min(0, "Dependents cannot be negative"),
  }),
  income: z.object({
    monthlyIncome: z.number().min(0, "Monthly income cannot be negative"),
    occupation: z.string().min(1, "Occupation is required"),
    incomeFrequency: z.enum(["monthly", "weekly", "yearly"]),
    jobStability: z.enum(["stable", "contract", "freelance", "seasonal"]),
    extraIncome: z.number().min(0, "Extra income cannot be negative"),
  }),
  expenses: z.object({
    totalMonthlyExpenses: z
      .number()
      .min(0, "Total expenses cannot be negative"),
    housing: z.number().min(0, "Housing expenses cannot be negative"),
    transportation: z
      .number()
      .min(0, "Transportation expenses cannot be negative"),
    food: z.number().min(0, "Food expenses cannot be negative"),
    subscriptions: z
      .number()
      .min(0, "Subscription expenses cannot be negative"),
    education: z.number().min(0, "Education expenses cannot be negative"),
    miscallaneous: z
      .number()
      .min(0, "Miscallaneous expenses cannot be negative"),
  }),
  debts: z.object({
    totalDebt: z.number().min(0, "Total debt cannot be negative"),
    monthlyDebtPayment: z
      .number()
      .min(0, "Monthly debt payment cannot be negative"),
    creditScore: z.number().optional(),

    deptBreakDown: z.array(
      z.object({
        type: z.enum([
          "credit_card",
          "mortgage",
          "student_loan",
          "car_loan",
          "personal_loan",
          "other",
        ]),
        totalDebt: z.number().min(0, "Amount cannot be negative"),
        balance: z.number().min(0, "Balance cannot be negative"),
      })
    ),
  }),
  assets: z.object({
    cashSavings: z.number().min(0, "Cash savings cannot be negative"),
    investments: z.number().min(0, "Investments cannot be negative"),
    retirementSavings: z
      .number()
      .min(0, "Retirement savings cannot be negative"),
    realEstateValue: z.number().min(0, "Real estate value cannot be negative"),
  }),
  goals: z.object({
    goals: z.array(
      z.object({
        description: z.string().min(1, "Goal description is required"),
        targetAmount: z.number().min(0, "Target amount cannot be negative"),
        timeline: z.string().min(1, "Timeline is required"),
        priority: z.enum(["high", "medium", "low"]),
      })
    ),
    riskTolerance: z.enum(["low", "medium", "high"]),
    retirementAge: z
      .number()
      .min(50, "Retirement age must be at least 50")
      .max(80, "Retirement age cannot exceed 80"),
  }),
  emergencyFund: z.object({
    monthsCovered: z.number().min(0, "Months covered cannot be negative"),
  }),
  lifestyle: z.object({
    spendingHabits: z.enum(["conservative", "average", "liberal"]),
    plannedBigPurchases: z.array(
      z.object({
        description: z.string().min(1, "Purchase description is required"),
      })
    ),
  }),
});
