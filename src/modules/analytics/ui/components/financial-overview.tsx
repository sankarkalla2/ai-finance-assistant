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
  const getCreditScore = (score: number): string => {
    if (score < 300) return "No Credit Score";
    if (score < 560) return "Poor Credit Score";
    if (score < 660) return "Fair Credit Score";
    if (score < 725) return "Good Credit Score";
    if (score < 760) return "Very Good Credit Score";
    return "Excellent Credit Score";
  };

  const cards = [
    {
      title: "Net Worth",
      value: `$${financialData.netWorth.toLocaleString()}`,
      description: "Total assets - Total debt",
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
      description: getCreditScore(financialData.creditScore),
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
