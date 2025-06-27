import {
  PrismaClient,
  Prisma,
  Dependent,
  UserInfo,
  Loan,
  EMI,
  Goal,
  Purchase,
} from "@/generated/prisma";

export type OnboardedUserType = {
  userInfo:
    | (UserInfo & {
        dependents: Dependent[];
        loans: Loan[];
        existingEMIs: EMI[];
        shortTermGoals: Goal[];
        longTermGoals: Goal[];
        plannedPurchases: Purchase[];
      })
    | null | undefined
};
