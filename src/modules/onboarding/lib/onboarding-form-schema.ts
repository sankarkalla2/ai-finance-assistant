import { z } from "zod";

const dependentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(0, "Age must be positive"),
  relationship: z.string().min(1, "Relationship is required"),
});

const loanSchema = z.object({
  type: z.string().min(1, "Loan type is required"),
  balance: z.number().min(0, "Balance must be positive"),
  interestRate: z.number().min(0, "Interest rate must be positive"),
  monthlyPayment: z.number().min(0, "Monthly payment must be positive"),
  remainingTerm: z.number().min(0, "Remaining term must be positive"),
});

const emiSchema = z.object({
  purpose: z.string().min(1, "Purpose is required"),
  amount: z.number().min(0, "Amount must be positive"),
  duration: z.number().min(0, "Duration must be positive"),
});

const goalSchema = z.object({
  description: z.string().min(1, "Description is required"),
  targetAmount: z.number().min(0, "Target amount must be positive"),
  timeline: z.string().min(1, "Timeline is required"),
  priority: z.enum(["high", "medium", "low"]),
});

const purchaseSchema = z.object({
  item: z.string().min(1, "Item is required"),
  estimatedCost: z.number().min(0, "Cost must be positive"),
  timeline: z.string().min(1, "Timeline is required"),
});

export const formSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "Name is required"),
    age: z
      .number()
      .min(18, "Age must be at least 18")
      .max(100, "Age must be realistic"),
    gender: z.string().optional(),
    maritalStatus: z.string().min(1, "Marital status is required"),
    dependents: z.array(dependentSchema),
    location: z.string().min(1, "Location is required"),
  }),
  income: z.object({
    primaryIncome: z.number().min(0, "Primary income must be positive"),
    occupation: z.string().min(1, "Occupation is required"),
    jobType: z.string().min(1, "Job type is required"),
    extraIncome: z.number().min(0, "Extra income must be positive"),
    incomeFrequency: z.string().min(1, "Income frequency is required"),
  }),
  assets: z.object({
    cashSavings: z.number().min(0, "Cash savings must be positive"),
    investments: z.number().min(0, "Investments must be positive"),
    realEstate: z.number().min(0, "Real estate value must be positive"),
    vehicles: z.number().min(0, "Vehicle value must be positive"),
    otherAssets: z.number().min(0, "Other assets must be positive"),
    liquidAssets: z.number().min(0, "Liquid assets must be positive"),
  }),
  debts: z.object({
    loans: z.array(loanSchema),
    mortgage: z.object({
      balance: z.number().min(0, "Mortgage balance must be positive"),
      interestRate: z.number().min(0, "Interest rate must be positive"),
      monthlyPayment: z.number().min(0, "Monthly payment must be positive"),
      yearsLeft: z.number().min(0, "Years left must be positive"),
    }),
    creditCardDebt: z.number().min(0, "Credit card debt must be positive"),
    otherLiabilities: z.number().min(0, "Other liabilities must be positive"),
    existingEMIs: z.array(emiSchema),
  }),
  expenses: z.object({
    housing: z.number().min(0, "Housing expenses must be positive"),
    utilities: z.number().min(0, "Utilities must be positive"),
    insurance: z.number().min(0, "Insurance must be positive"),
    food: z.number().min(0, "Food expenses must be positive"),
    transportation: z.number().min(0, "Transportation must be positive"),
    healthcare: z.number().min(0, "Healthcare must be positive"),
    education: z.number().min(0, "Education must be positive"),
    entertainment: z.number().min(0, "Entertainment must be positive"),
    personalCare: z.number().min(0, "Personal care must be positive"),
    childcare: z.number().min(0, "Childcare must be positive"),
    miscellaneous: z.number().min(0, "Miscellaneous must be positive"),
  }),
  goals: z.object({
    shortTermGoals: z.array(goalSchema),
    longTermGoals: z.array(goalSchema),
    riskTolerance: z.string().min(1, "Risk tolerance is required"),
  }),
  lifestyle: z.object({
    spendingHabits: z.string().min(1, "Spending habits is required"),
    carPreferences: z.object({
      type: z.string().optional(),
      newOrUsed: z.string().optional(),
      budget: z.number().min(0, "Budget must be positive"),
      brandPreference: z.string().optional(),
      financingPreference: z.string().optional(),
    }),
    plannedPurchases: z.array(purchaseSchema),
  }),
  additionalContext: z.object({
    creditScore: z
      .number()
      .min(300, "Credit score must be at least 300")
      .max(850, "Credit score must be at most 850")
      .optional(),
    jobStability: z.string().min(1, "Job stability is required"),
    retirementAge: z
      .number()
      .min(50, "Retirement age must be at least 50")
      .max(80, "Retirement age must be realistic"),
    emergencyFundMonths: z
      .number()
      .min(0, "Emergency fund months must be positive"),
    taxRate: z
      .number()
      .min(0, "Tax rate must be positive")
      .max(100, "Tax rate must be realistic"),
  }),
});

export type FormData = z.infer<typeof formSchema>;
