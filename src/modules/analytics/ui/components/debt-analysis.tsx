import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CreditCard } from "lucide-react";

type DebtType = "credit_card" | "car_loan" | "student_loan" | "mortgage" | "personal_loan" | "other";

interface Debt {
  type: DebtType;
  balance: number;
  monthlyPayment: number;
  interestRate: number;
  payoffMonths: number;
  originalTermMonths?: number;
}

interface DebtAnalysisProps {
  debts: Debt[];
  monthlyIncome: number;
}

export function DebtAnalysis({ debts, monthlyIncome }: DebtAnalysisProps) {
  if (!debts.length) return <div>No debt data available</div>;

  // Validate debt data
  if (debts.some((debt) => debt.balance < 0 || debt.monthlyPayment < 0 || debt.interestRate < 0)) {
    console.warn("Invalid debt data detected");
  }

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMonthlyPayment = debts.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
  const debtToIncomeRatio = monthlyIncome > 0 ? (totalMonthlyPayment / monthlyIncome) * 100 : 0;

  const getDebtTypeLabel = (type: DebtType) => {
    switch (type) {
      case "credit_card": return "Credit Card";
      case "car_loan": return "Auto Loan";
      case "student_loan": return "Student Loan";
      case "mortgage": return "Mortgage";
      case "personal_loan": return "Personal Loan";
      default: return "Other";
    }
  };

  const getRiskLevel = (ratio: number) => {
    if (ratio < 15) return { level: "Low", color: "bg-green-100 text-green-800" };
    if (ratio < 36) return { level: "Moderate", color: "bg-yellow-100 text-yellow-800" };
    return { level: "High", color: "bg-red-100 text-red-800" };
  };

  const riskAssessment = getRiskLevel(debtToIncomeRatio);

  const getRecommendations = () => {
    const recommendations = [];
    const highestInterestDebt = debts.reduce((prev, curr) =>
      curr.interestRate > prev.interestRate ? curr : prev
    );
    recommendations.push(
      `Focus on paying off ${getDebtTypeLabel(highestInterestDebt.type)} first (highest interest rate: ${highestInterestDebt.interestRate}%).`
    );
    if (highestInterestDebt.interestRate > 10) {
      recommendations.push("Consider debt consolidation for high-interest debts.");
    }
    recommendations.push("Maintain minimum payments on all other debts.");
    const maxPayoffMonths = Math.max(...debts.map((debt) => debt.payoffMonths));
    const debtFreeDate = new Date();
    debtFreeDate.setMonth(debtFreeDate.getMonth() + maxPayoffMonths);
    recommendations.push(
      `Target debt-free date: ${debtFreeDate.toLocaleString("default", { month: "long", year: "numeric" })}`
    );
    return recommendations;
  };

  return (
    <Card className="w-full max-w-md md:*:max-w-lg lg:max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Debt Analysis</span>
        </CardTitle>
        <CardDescription>
          Overview of current debt obligations and repayment strategy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Metrics */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-bold">${totalDebt.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Debt</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">${totalMonthlyPayment}</p>
            <p className="text-sm text-muted-foreground">Monthly Payment</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{debtToIncomeRatio.toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground">Debt-to-Income</p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle
              className={`h-4 w-4 mr-1 ${riskAssessment.level === "High" ? "text-red-500" : riskAssessment.level === "Moderate" ? "text-yellow-500" : "text-green-500"}`}
              aria-label={`Debt risk level: ${riskAssessment.level}`}
            />
            <span className="font-medium">Debt Risk Level</span>
          </div>
          <Badge className={riskAssessment.color}>{riskAssessment.level}</Badge>
        </div>

        {/* Debt Breakdown Chart */}
        <div className="mt-4">
          <h4 className="font-medium text-sm">Debt Breakdown by Type</h4>
          {/* Chart placeholder */}
        </div>

        {/* Individual Debts */}
        <div className="space-y-4">
          <h4 className="font-medium">Debt Breakdown</h4>
          {debts.map((debt, index) => {
            const progress = debt.originalTermMonths
              ? ((debt.originalTermMonths - debt.payoffMonths) / debt.originalTermMonths) * 100
              : 100 - (debt.payoffMonths / 60) * 100;
            return (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">{getDebtTypeLabel(debt.type)}</h5>
                  <span className="text-sm text-muted-foreground">
                    {debt.interestRate}% APR
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Balance</p>
                    <p className="font-medium">${debt.balance.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Monthly Payment</p>
                    <p className="font-medium">${debt.monthlyPayment}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Payoff Progress</span>
                    <span>{debt.payoffMonths} months remaining</span>
                  </div>
                  <Progress
                    value={progress}
                    className="h-2"
                    aria-label={`${getDebtTypeLabel(debt.type)} payoff progress`}
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendations */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Debt Payoff Strategy</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            {getRecommendations().map((rec, index) => (
              <li key={index}>• {rec}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}