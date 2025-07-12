import { PrismaClient, Prisma, UserInfo, Goal, DeptBreakDown } from "@/generated/prisma";

export type OnboardedUserType = {
  userInfo:
    | (UserInfo & {
        goals: Goal[];
        deptBreakDowns: DeptBreakDown[]
      })
    | null
    | undefined;
};
