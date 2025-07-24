"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinancialOverview } from "../components/financial-overview";
import { EmergencyFundStatus } from "../components/emergency-funds";
import { RiskAssessment } from "../components/risk-management";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/app/server/user";
import { DebtAnalysis } from "../components/debt-analysis";
import { SpendingAnalysis } from "../components/spending-analysis";
import { DeptBreakDown, JobStability, riskTolerance } from "@/generated/prisma";
import { SquareDashedBottom } from "lucide-react";

interface AnalyticsPageViewProps {
  userId: string;
}
const AnalyticsPageView = ({ userId }: AnalyticsPageViewProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-user-data"],
    queryFn: () => getUserInfo(userId),
  });

  const getTotalMonthlyIncome = (
    totalIncome: number,
    incomeFrequency: "weekly" | "monthly" | "yearly"
  ) => {
    switch (incomeFrequency) {
      case "weekly":
        return totalIncome * 4;
      case "monthly":
        return totalIncome;
      case "yearly":
        return totalIncome / 12;
      default:
        return 0;
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        Loading...
      </div>
    );
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        Error fetching user data. Please try again later or contact support.
      </div>
    );
  }
  if (!data || !data.data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        No user data available
      </div>
    );

  const totalIncome =
    (data.data?.monthlyIncome || 0) + (data?.data?.extraIncome || 0);
  const totalMonthlyIncome = getTotalMonthlyIncome(
    totalIncome,
    data.data?.incomeFrequency || "monthly"
  );
  const savings = totalMonthlyIncome - (data.data?.totalMonthlyExpenses || 0);
  const financialData = {
    totalDebt: data.data?.totalDebt || 0,
    totalAssets:
      (data.data?.cashSavings || 0) +
      (data.data?.investments || 0) +
      (data.data?.retirementSavings || 0) +
      (data.data?.realEstateVAlue || 0),
    netWorth:
      (data.data?.cashSavings || 0) +
      (data.data?.investments || 0) +
      (data.data?.realEstateVAlue || 0) +
      (data.data?.retirementSavings || 0) -
      (data.data?.totalDebt || 0),
    monthlyExpenses: data.data?.totalMonthlyExpenses || 0,
    savingsRate:
      totalIncome > 0 ? Math.round((savings / totalMonthlyIncome) * 100) : 0,
    creditScore: data.data?.creditScore || 0,
    monthlyIncome: totalMonthlyIncome,
  };

  const currentEmergencyFund =
    (data.data?.totalMonthlyExpenses || 0) *
    (data.data?.emergencyFundMonthsCovered || 1);
  const recommendedFund = (data.data?.totalMonthlyExpenses || 0) * 6;

  const emergencyFundsStatus = {
    monthlyExpenses: data.data?.totalMonthlyExpenses || 0,
    currentEmergencyFund: currentEmergencyFund,
    recommendedFund: recommendedFund,
    emergencyFundMonthsCovered: data.data?.emergencyFundMonthsCovered || 0,
    progress: (currentEmergencyFund / recommendedFund) * 100,
  };

  const getInvestementAllocationInPercentage = (allocationAmount: number) => {
    const totalAssets =
      (data.data?.cashSavings || 0) +
      (data.data?.investments || 0) +
      (data.data?.realEstateVAlue || 0);

    return Math.floor((allocationAmount / totalAssets) * 100);
  };

  const riskTolerance = {
    riskTolerance: data.data?.riskTolerance || "medium",
    age: data.data?.age || 18,
    jobStability: data.data?.jobStability || "stable",
    emergencyFundMonths: data.data?.emergencyFundMonthsCovered || 0,
    debtToIncomeRatio:
      totalMonthlyIncome > 0
        ? (data.data?.monthlyDebtPayment || 0) / totalMonthlyIncome
        : 0,
    investmentAllocation: {
      stocks: getInvestementAllocationInPercentage(data.data?.investments || 0),
      realEstateValue: getInvestementAllocationInPercentage(
        data.data?.realEstateVAlue || 0
      ),
      cash: getInvestementAllocationInPercentage(data.data?.cashSavings || 0),
    },
  };

  const calculatePayoffMonths = (
    balance: number,
    monthlyPayment: number,
    interestRate: number = 5
  ): number => {
    if (balance <= 0) return 0;
    if (monthlyPayment <= 0) {
      console.warn("Invalid monthly payment: must be greater than 0");
      return Infinity;
    }

    const monthlyRate = interestRate / 100 / 12;
    if (monthlyRate === 0) {
      return Math.ceil(balance / monthlyPayment);
    }

    const interestPerMonth = balance * monthlyRate;
    if (monthlyPayment <= interestPerMonth) {
      console.warn("Monthly payment is too low to cover interest");
      return Infinity;
    }

    const n =
      Math.log(monthlyPayment / (monthlyPayment - monthlyRate * balance)) /
      Math.log(1 + monthlyRate);
    return Math.ceil(n);
  };
  const debtsAnalysis = data.data?.deptBreakDowns || [];
  const debts = debtsAnalysis.map((debt: DeptBreakDown) => ({
    type: debt.type,
    balance: debt.balance,
    monthlyPayment: debt.monthlyPayment,
    interestRate: 0,
    payoffMonths: calculatePayoffMonths(debt.balance, debt.monthlyPayment),
    originalTermMonths: calculatePayoffMonths(
      debt.balance,
      debt.monthlyPayment
    ),
  }));

  const expenses = {
    housing: data.data?.housing || 0,
    transportation: data.data?.transportation || 0,
    subscriptions: data.data?.subscription || 0,
    education: data.data?.education || 0,
    miscellaneous: data.data?.miscellaneous || 0,
    totalExpenses: data.data?.totalMonthlyExpenses || 0,
    totalMonthlyIncome: totalMonthlyIncome,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            User Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive insights into user financial health and engagement
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full  space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals" disabled>
            Goals
          </TabsTrigger>
          <TabsTrigger value="ai-insights" disabled>
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FinancialOverview financialData={financialData} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <EmergencyFundStatus emergencyFundStatus={emergencyFundsStatus} />
              <DebtAnalysis debts={debts} monthlyIncome={totalMonthlyIncome} />
            </div>
            <div className="space-y-6">
              <RiskAssessment riskTolerance={riskTolerance} />
              <SpendingAnalysis expenses={expenses} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPageView;
