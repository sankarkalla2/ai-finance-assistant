import { z } from "zod";

export const canIAffordFormSchema = z.object({
  monthlyIncome: z.number().min(0, { message: 'must be great than 0'}),
  monthlyExpenses: z.number(),
  outstandingLoanBalance: z.number(),
  monthlyPayableEMIs: z.number(),
  targetedPurchaseAmount: z.number(),
  downPayment: z.number(),
  loanTenure: z.number(),
  interestRate: z.number(),
});


