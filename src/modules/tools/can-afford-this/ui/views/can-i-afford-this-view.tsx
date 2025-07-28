"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";

interface FormData {
  monthlyIncome: number;
  monthlyExpenses: number;
  totalPayableEMI: number;
  monthlyPayableEMIs: number;
  targetedPurchaseAmount: number;
  loanTenure: number; // in months
  interestRate: number; // annual percentage
}

interface AffordabilityResult {
  canAfford: boolean;
  disposableIncome: number;
  safeDisposableIncome: number;
  actualEMI: number;
  monthlyInterest: number;
  totalInterest: number;
  totalAmount: number;
  affordabilityPercentage: number;
  tips: string[];
}

interface CanIAffordThisProps {
  monthlyIncome: number;
  monthlyExpenses: number;
  totalPayableEMI: number;
  monthlyPayableEMIs: number;
}
export default function CanIAffordThis({
  monthlyExpenses,
  monthlyPayableEMIs,
  totalPayableEMI,
  monthlyIncome,
}: CanIAffordThisProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      monthlyIncome: monthlyIncome,
      monthlyExpenses: monthlyExpenses,
      totalPayableEMI: totalPayableEMI,
      monthlyPayableEMIs: monthlyPayableEMIs,
      targetedPurchaseAmount: 0,
      loanTenure: 12,
      interestRate: 15,
    },
    mode: "onChange",
  });

  const watchedValues = watch();
  const [result, setResult] = useState<AffordabilityResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculateAffordability = (data: FormData): AffordabilityResult => {
    const {
      monthlyIncome,
      monthlyExpenses,
      monthlyPayableEMIs,
      targetedPurchaseAmount,
      loanTenure,
      interestRate,
    } = data;

    // Calculate actual EMI for the targeted purchase
    const monthlyRate = interestRate / 100 / 12;
    const actualEMI =
      loanTenure > 0 && targetedPurchaseAmount > 0 && interestRate > 0
        ? (targetedPurchaseAmount *
            monthlyRate *
            Math.pow(1 + monthlyRate, loanTenure)) /
          (Math.pow(1 + monthlyRate, loanTenure) - 1)
        : targetedPurchaseAmount / (loanTenure || 1);

    // Calculate total amounts
    const totalAmount = actualEMI * loanTenure;
    const totalInterest = totalAmount - targetedPurchaseAmount;
    const monthlyInterest = totalInterest / loanTenure;

    // Calculate disposable income
    const disposableIncome =
      monthlyIncome - monthlyExpenses - monthlyPayableEMIs;
    const safeDisposableIncome = disposableIncome * 0.8;

    // Check if can afford based on actual EMI
    const canAfford = actualEMI <= safeDisposableIncome && disposableIncome > 0;

    // Calculate affordability percentage based on actual EMI
    const affordabilityPercentage =
      safeDisposableIncome > 0
        ? Math.min((actualEMI / safeDisposableIncome) * 100, 100)
        : 0;

    // Generate tips based on the situation
    const tips: string[] = [];

    if (disposableIncome <= 0) {
      tips.push(
        "⚠️ Your expenses exceed your income. Focus on reducing expenses first."
      );
      tips.push("💡 Consider additional income sources or side hustles.");
      tips.push(
        "📊 Review and categorize all expenses to identify areas to cut."
      );
    } else if (canAfford) {
      tips.push(
        "✅ You can afford this purchase with the specified loan terms!"
      );
      tips.push(
        `💰 Your monthly commitment will be $${actualEMI.toFixed(2)} for ${loanTenure} months.`
      );
      tips.push(
        `📈 You'll pay $${monthlyInterest.toFixed(2)} in interest each month.`
      );
      tips.push(
        "🎯 Consider making prepayments to reduce total interest cost."
      );
      tips.push(
        `💡 After this purchase, you'll have $${(safeDisposableIncome - actualEMI).toFixed(2)} left for other expenses.`
      );
    } else {
      const shortfall = actualEMI - safeDisposableIncome;
      tips.push(
        "⏳ The EMI for this purchase exceeds your safe spending limit."
      );
      tips.push(
        `💡 You need an additional $${shortfall.toFixed(2)} monthly income or reduce expenses.`
      );
      tips.push(
        "🔍 Consider a longer tenure to reduce EMI or a smaller purchase amount."
      );
      tips.push(
        `📊 Current EMI: $${actualEMI.toFixed(2)}, Safe limit: $${safeDisposableIncome.toFixed(2)}`
      );
    }

    // Additional tips based on loan terms
    if (interestRate > 18) {
      tips.push("⚠️ Interest rate seems high. Shop around for better rates.");
    }
    if (loanTenure > 36) {
      tips.push(
        "⏰ Long tenure means more total interest. Consider shorter tenure if possible."
      );
    }
    if (monthlyInterest > actualEMI * 0.5) {
      tips.push(
        "💸 Interest makes up a large portion of your EMI. Consider a shorter tenure."
      );
    }

    tips.push(
      "🏦 Always maintain an emergency fund of 3-6 months of expenses."
    );
    tips.push("📱 Use budgeting apps to track your spending habits.");

    return {
      canAfford,
      disposableIncome,
      safeDisposableIncome,
      actualEMI,
      monthlyInterest,
      totalInterest,
      totalAmount,
      affordabilityPercentage,
      tips,
    };
  };

  const onSubmit = (data: FormData) => {
    const calculatedResult = calculateAffordability(data);
    setResult(calculatedResult);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen p-4 bg-accent">
      <div className="max-w-4xl mx-auto space-y-6 mt-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">Can I Afford This?</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Make informed financial decisions with our comprehensive
            affordability calculator. Get personalized insights and tips for
            your purchase.
          </p>
        </div>

        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Information
            </CardTitle>
            <CardDescription>
              Enter your financial details to calculate affordability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    placeholder="5000"
                    {...register("monthlyIncome", {
                      required: "Monthly income is required",
                      min: {
                        value: 1,
                        message: "Income must be greater than 0",
                      },
                    })}
                  />
                  {errors.monthlyIncome && (
                    <p className="text-sm text-red-600">
                      {errors.monthlyIncome.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses">Monthly Expenses ($)</Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    placeholder="3000"
                    {...register("monthlyExpenses", {
                      required: "Monthly expenses is required",
                      min: { value: 0, message: "Expenses cannot be negative" },
                    })}
                  />
                  {errors.monthlyExpenses && (
                    <p className="text-sm text-red-600">
                      {errors.monthlyExpenses.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalPayableEMI">Total Payable EMI ($)</Label>
                  <Input
                    id="totalPayableEMI"
                    type="number"
                    placeholder="50000"
                    {...register("totalPayableEMI", {
                      min: { value: 0, message: "Cannot be negative" },
                    })}
                  />
                  {errors.totalPayableEMI && (
                    <p className="text-sm text-red-600">
                      {errors.totalPayableEMI.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyPayableEMIs">
                    Monthly Payable EMIs ($)
                  </Label>
                  <Input
                    id="monthlyPayableEMIs"
                    type="number"
                    placeholder="800"
                    {...register("monthlyPayableEMIs", {
                      min: { value: 0, message: "Cannot be negative" },
                    })}
                  />
                  {errors.monthlyPayableEMIs && (
                    <p className="text-sm text-red-600">
                      {errors.monthlyPayableEMIs.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="targetedPurchaseAmount">
                    Targeted Purchase Amount ($)
                  </Label>
                  <Input
                    id="targetedPurchaseAmount"
                    type="number"
                    placeholder="15000"
                    {...register("targetedPurchaseAmount", {
                      required: "Purchase amount is required",
                      min: {
                        value: 1,
                        message: "Purchase amount must be greater than 0",
                      },
                    })}
                  />
                  {errors.targetedPurchaseAmount && (
                    <p className="text-sm text-red-600">
                      {errors.targetedPurchaseAmount.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanTenure">Loan Tenure (Months)</Label>
                  <Input
                    id="loanTenure"
                    type="number"
                    placeholder="12"
                    {...register("loanTenure", {
                      required: "Loan tenure is required",
                      min: {
                        value: 1,
                        message: "Tenure must be at least 1 month",
                      },
                      max: {
                        value: 360,
                        message: "Tenure cannot exceed 360 months",
                      },
                    })}
                  />
                  {errors.loanTenure && (
                    <p className="text-sm text-red-600">
                      {errors.loanTenure.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (% Annual)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    placeholder="15.0"
                    {...register("interestRate", {
                      required: "Interest rate is required",
                      min: {
                        value: 0,
                        message: "Interest rate cannot be negative",
                      },
                      max: {
                        value: 50,
                        message: "Interest rate seems too high",
                      },
                    })}
                  />
                  {errors.interestRate && (
                    <p className="text-sm text-red-600">
                      {errors.interestRate.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isValid}
              >
                Can I Buy Now?
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Financial Overview Before Purchase */}
        {showResult && result && (
          <div className="space-y-6">
            {/* Current Financial Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Your Financial Commitment Breakdown
                </CardTitle>
                <CardDescription>
                  Understanding your monthly financial obligations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border">
                    <div className="text-lg font-bold text-blue-600">
                      $
                      {(Number(watchedValues.monthlyPayableEMIs) || 0).toFixed(
                        2
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      Current Monthly EMIs
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border">
                    <div className="text-lg font-bold text-orange-600">
                      ${result.actualEMI.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      New Purchase EMI
                    </div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg border">
                    <div className="text-lg font-bold text-red-600">
                      ${result.monthlyInterest.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Monthly Interest Cost
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border">
                    <div className="text-lg font-bold text-purple-600">
                      $
                      {(
                        (Number(watchedValues.monthlyPayableEMIs) || 0) +
                        result.actualEMI
                      ).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Monthly EMIs
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Interest Cost Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold ml-2">
                        ${result.totalInterest.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-semibold ml-2">
                        ${result.totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Interest %:</span>
                      <span className="font-semibold ml-2">
                        {(
                          (result.totalInterest /
                            (Number(watchedValues.targetedPurchaseAmount) ||
                              1)) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Affordability Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.canAfford ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  Affordability Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert
                  className={
                    result.canAfford
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-lg font-semibold">
                    {result.canAfford
                      ? "✅ Yes, you can afford this purchase!"
                      : "❌ This purchase is currently not recommended."}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ${result.disposableIncome.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Monthly Disposable Income
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ${result.safeDisposableIncome.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Safe Spending Limit
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {result.affordabilityPercentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      EMI vs Safe Limit
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Affordability Score</span>
                    <span>{result.affordabilityPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress
                    value={result.affordabilityPercentage}
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500">
                    {result.affordabilityPercentage <= 50
                      ? "Excellent - Low financial stress"
                      : result.affordabilityPercentage <= 80
                        ? "Good - Manageable commitment"
                        : "High - Consider reducing EMI"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Financial Tips & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {result.tips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="text-sm">{tip}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
