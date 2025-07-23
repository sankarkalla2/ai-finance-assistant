import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Target } from "lucide-react";
import { JobStability, riskTolerance } from "@/generated/prisma";

interface RiskAssessmentProps {
  riskTolerance: {
    riskTolerance: riskTolerance;
    age: number;
    jobStability: JobStability;
    emergencyFundMonths: number;
    debtToIncomeRatio: number;
    investmentAllocation: {
      stocks: number;
      realEstateValue: number;
      cash: number;
    };
  };
}

export function RiskAssessment({ riskTolerance }: RiskAssessmentProps) {
  const recommendedAllocation = {
    stocks:
      riskTolerance.riskTolerance === "high"
        ? 80
        : riskTolerance.riskTolerance === "medium"
          ? 70
          : 60,
    realEstateValue:
      riskTolerance.riskTolerance === "high"
        ? 15
        : riskTolerance.riskTolerance === "medium"
          ? 20
          : 25,
    cash:
      riskTolerance.riskTolerance === "high"
        ? 5
        : riskTolerance.riskTolerance === "medium"
          ? 10
          : 15,
  };

  const calculateRiskFactors = () => {
    return [
      {
        factor: "Age & Time Horizon",
        score: riskTolerance.age < 30 ? 90 : riskTolerance.age < 50 ? 80 : 60,
        status:
          riskTolerance.age < 30
            ? "Excellent"
            : riskTolerance.age < 50
              ? "Good"
              : "Fair",
        description: `Your age (${riskTolerance.age}) suggests a ${
          riskTolerance.age < 30
            ? "long"
            : riskTolerance.age < 50
              ? "moderate"
              : "shorter"
        } investment horizon.`,
      },
      {
        factor: "Job Stability",
        score:
          riskTolerance.jobStability === "stable"
            ? 90
            : riskTolerance.jobStability === "freelance"
              ? 70
              : 50,
        status:
          riskTolerance.jobStability === "stable"
            ? "Excellent"
            : riskTolerance.jobStability === "freelance"
              ? "Good"
              : "Fair",
        description: `Your job stability is ${riskTolerance.jobStability.toLowerCase()}.`,
      },
      {
        factor: "Emergency Fund",
        score:
          riskTolerance.emergencyFundMonths >= 6
            ? 90
            : riskTolerance.emergencyFundMonths >= 3
              ? 75
              : 50,
        status:
          riskTolerance.emergencyFundMonths >= 6
            ? "Excellent"
            : riskTolerance.emergencyFundMonths >= 3
              ? "Good"
              : "Fair",
        description: `Your emergency fund covers ${riskTolerance.emergencyFundMonths} months.`,
      },
      {
        factor: "Debt Management",
        score:
          riskTolerance.debtToIncomeRatio < 0.36
            ? 85
            : riskTolerance.debtToIncomeRatio < 0.5
              ? 65
              : 40,
        status:
          riskTolerance.debtToIncomeRatio < 0.36
            ? "Good"
            : riskTolerance.debtToIncomeRatio < 0.5
              ? "Fair"
              : "Poor",
        description: `Your debt-to-income ratio is ${(riskTolerance.debtToIncomeRatio * 100).toFixed(1)}%.`,
      },
      {
        factor: "Investment Diversification",
        score:
          Math.abs(
            riskTolerance.investmentAllocation.stocks -
              recommendedAllocation.stocks
          ) < 10
            ? 85
            : 60,
        status:
          Math.abs(
            riskTolerance.investmentAllocation.stocks -
              recommendedAllocation.stocks
          ) < 10
            ? "Good"
            : "Fair",
        description:
          "Your portfolio allocation is compared to the recommended allocation.",
      },
    ];
  };

  const riskFactors = calculateRiskFactors();
  const weights = {
    age: 0.3,
    jobStability: 0.2,
    emergencyFund: 0.2,
    debtManagement: 0.2,
    diversification: 0.1,
  };
  const overallRiskScore = riskFactors.reduce((sum, factor, index) => {
    const weight = Object.values(weights)[index];
    return sum + factor.score * weight;
  }, 0);

  const getRiskLevel = (score: number, tolerance: riskTolerance) => {
    if (tolerance === "high" || score >= 80)
      return { level: "Aggressive", color: "bg-red-100 text-red-800" };
    if (tolerance === "medium" || score >= 60)
      return { level: "Moderate", color: "bg-yellow-100 text-yellow-800" };
    return { level: "Conservative", color: "bg-green-100 text-green-800" };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "text-green-600";
      case "Good":
      case "Favorable":
        return "text-blue-600";
      case "Fair":
        return "text-yellow-600";
      case "Poor":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getRecommendations = () => {
    const recommendations = [];
    if (riskTolerance.emergencyFundMonths < 6) {
      recommendations.push(
        `Increase your emergency fund to cover at least 6 months (currently ${riskTolerance.emergencyFundMonths} months).`
      );
    }
    if (riskTolerance.debtToIncomeRatio > 0.36) {
      recommendations.push(
        "Focus on reducing your debt-to-income ratio by paying down high-interest debt."
      );
    }
    if (
      Math.abs(
        riskTolerance.investmentAllocation.stocks - recommendedAllocation.stocks
      ) > 10
    ) {
      recommendations.push(
        `Rebalance your portfolio to align with recommended stock allocation (${recommendedAllocation.stocks}%).`
      );
    }
    if (riskTolerance.jobStability !== "stable") {
      recommendations.push(
        "Consider more conservative investments due to job stability concerns."
      );
    }
    recommendations.push("Review and rebalance portfolio quarterly.");
    return recommendations.length > 0
      ? recommendations
      : [
          "Your risk profile is well-balanced. Continue monitoring your financial health.",
        ];
  };

  return (
    <Card className="w-full max-w-md md:*:max-w-lg lg:max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Risk Assessment</span>
        </CardTitle>
        <CardDescription>
          Comprehensive analysis of financial risk profile and investment
          suitability
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Risk Score */}
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-3xl font-bold mb-2">
            {overallRiskScore.toFixed(0)}/100
          </div>
          <Badge
            className={
              getRiskLevel(overallRiskScore, riskTolerance.riskTolerance).color
            }
          >
            {getRiskLevel(overallRiskScore, riskTolerance.riskTolerance).level}
          </Badge>
          <p className="text-sm text-muted-foreground mt-2">
            Overall Risk Capacity Score
          </p>
        </div>

        {/* Risk Factors */}
        <div className="space-y-4">
          <h4 className="font-medium">Risk Factor Analysis</h4>
          {riskFactors.map((factor, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{factor.factor}</span>
                <span
                  className={`text-sm font-medium ${getStatusColor(factor.status)} flex items-center`}
                >
                  {factor.status === "Excellent" && (
                    <Shield className="h-4 w-4 mr-1" />
                  )}
                  {factor.status}
                </span>
              </div>
              <Progress
                value={factor.score}
                className="h-2"
                aria-label={`${factor.factor} progress`}
                aria-valuenow={factor.score}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <p className="text-xs text-muted-foreground">
                {factor.description}
              </p>
            </div>
          ))}
        </div>

        {/* Current vs Recommended Allocation */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Current Allocation</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Stocks</span>
                <span>{riskTolerance.investmentAllocation.stocks}%</span>
              </div>
              <Progress
                value={riskTolerance.investmentAllocation.stocks}
                className="h-2"
                aria-label="Stocks allocation"
                aria-valuenow={riskTolerance.investmentAllocation.stocks}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <div className="flex justify-between text-sm">
                <span>Real Estate</span>
                <span>
                  {riskTolerance.investmentAllocation.realEstateValue}%
                </span>
              </div>
              <Progress
                value={riskTolerance.investmentAllocation.realEstateValue}
                className="h-2"
                aria-label="Real Estate allocation"
                aria-valuenow={
                  riskTolerance.investmentAllocation.realEstateValue
                }
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <div className="flex justify-between text-sm">
                <span>Cash</span>
                <span>{riskTolerance.investmentAllocation.cash}%</span>
              </div>
              <Progress
                value={riskTolerance.investmentAllocation.cash}
                className="h-2"
                aria-label="Cash allocation"
                aria-valuenow={riskTolerance.investmentAllocation.cash}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm">Recommended Allocation</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Stocks</span>
                <span>{recommendedAllocation.stocks}%</span>
              </div>
              <Progress
                value={recommendedAllocation.stocks}
                className="h-2"
                aria-label="Recommended stocks allocation"
                aria-valuenow={recommendedAllocation.stocks}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <div className="flex justify-between text-sm">
                <span>Real Estate</span>
                <span>{recommendedAllocation.realEstateValue}%</span>
              </div>
              <Progress
                value={recommendedAllocation.realEstateValue}
                className="h-2"
                aria-label="Recommended real estate allocation"
                aria-valuenow={recommendedAllocation.realEstateValue}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <div className="flex justify-between text-sm">
                <span>Cash</span>
                <span>{recommendedAllocation.cash}%</span>
              </div>
              <Progress
                value={recommendedAllocation.cash}
                className="h-2"
                aria-label="Recommended cash allocation"
                aria-valuenow={recommendedAllocation.cash}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>

        {/* Allocation Chart */}
        <div className="mt-4">
          <h4 className="font-medium text-sm">Allocation Comparison</h4>
          {/* Chart placeholder */}
        </div>

        {/* Recommendations */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
            <Target className="h-4 w-4 mr-1" />
            Risk Management Recommendations
          </h4>
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
