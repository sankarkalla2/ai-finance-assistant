import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, PiggyBank } from "lucide-react";

interface FinancialOverviewType {
  financialData: {
    totalAssets: number;
    totalDebt: number;
    netWorth: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    savingsRate: number;
    creditScore: number;
  };
}
export function FinancialOverview({ financialData }: FinancialOverviewType) {
  const cards = [
    {
      title: "Net Worth",
      value: `$${financialData.netWorth.toLocaleString()}`,
      description: "+12% from last month",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Monthly Cash Flow",
      value: `$${(financialData.monthlyIncome - financialData.monthlyExpenses).toLocaleString()}`,
      description: "Income - Expenses",
      icon: DollarSign,
      trend: "neutral",
    },
    {
      title: "Savings Rate",
      value: `${financialData.savingsRate}%`,
      description: "Above recommended 20%",
      icon: PiggyBank,
      trend: "up",
    },
    {
      title: "Credit Score",
      value: financialData.creditScore.toString(),
      description: "Excellent credit",
      icon: TrendingUp,
      trend: "up",
    },
  ];

  return (
    <>
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon
              className={`h-4 w-4 ${
                card.trend === "up"
                  ? "text-green-600"
                  : card.trend === "down"
                    ? "text-red-600"
                    : "text-muted-foreground"
              }`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
