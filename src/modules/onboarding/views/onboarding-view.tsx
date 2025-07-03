"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formSchema,
  type FormData,
} from "@/modules/onboarding/lib/onboarding-form-schema";
import PersonalInfoStep from "@/modules/onboarding/components/onboarding-personal-info-step";
import IncomeStep from "@/modules/onboarding/components/onboarding-income-step";
import AssetsStep from "@/modules/onboarding/components/onboarding-asserts-step";
import DebtsStep from "@/modules/onboarding/components/onboarding-debt-step";
import ExpensesStep from "@/modules/onboarding/components/onboarding-expenses-step";
import GoalsStep from "@/modules/onboarding/components/onboarding-goals-step";
import LifestyleStep from "@/modules/onboarding/components/onboarding-lifestyle-step";
import AdditionalContextStep from "@/modules/onboarding/components/onboarding-additional-context-step";
// import { useToast } from '@/hooks/use-toast';
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { OnboardedUserType } from "../types";
import { z } from "zod";
import { onboardNewUser } from "../server/onboarding-user";
import { useRouter } from "next/navigation";

const steps = [
  { id: "personal", title: "Personal Info", component: PersonalInfoStep },
  { id: "income", title: "Income", component: IncomeStep },
  { id: "assets", title: "Assets", component: AssetsStep },
  { id: "debts", title: "Debts", component: DebtsStep },
  { id: "expenses", title: "Expenses", component: ExpensesStep },
  { id: "goals", title: "Goals", component: GoalsStep },
  { id: "lifestyle", title: "Lifestyle", component: LifestyleStep },
  { id: "context", title: "Additional", component: AdditionalContextStep },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

const MultiStepForm = ({ userInfo }: OnboardedUserType) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //   const { toast: shadcnToast } = useToast();

  const router = useRouter();
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      personalInfo: {
        name: userInfo?.name ?? "",
        age: userInfo?.age ?? 0,
        gender: userInfo?.gender ?? "prefer-not-to-say",
        maritalStatus: userInfo?.maritalStatus ?? "single",
        dependents: userInfo?.dependents ?? [],
        location: userInfo?.location ?? "",
      },
      income: {
        primaryIncome: userInfo?.primaryIncome ?? 0,
        occupation: userInfo?.occupation ?? "",
        jobType: userInfo?.jobType ?? "",
        extraIncome: userInfo?.extraIncome ?? 0,
        incomeFrequency: userInfo?.incomeFrequency ?? "",
      },
      assets: {
        cashSavings: userInfo?.cashSavings ?? 0,
        investments: userInfo?.investments ?? 0,
        realEstate: userInfo?.realEstate ?? 0,
        vehicles: userInfo?.vehicles ?? 0,
        otherAssets: userInfo?.otherAssets ?? 0,
        liquidAssets: userInfo?.liquidAssets ?? 0,
      },
      debts: {
        loans: userInfo?.loans ?? [],
        mortgage: {
          balance: userInfo?.mortgageBalance ?? 0,
          interestRate: userInfo?.mortgageInterestRate ?? 0,
          monthlyPayment: userInfo?.mortgageInterestRate ?? 0,
          yearsLeft: userInfo?.mortgageYearsLeft ?? 0,
        },
        creditCardDebt: userInfo?.creditCardDebt ?? 0,
        otherLiabilities: userInfo?.otherLiabilities ?? 0,
        existingEMIs: userInfo?.existingEMIs ?? [],
      },
      expenses: {
        housing: userInfo?.housing ?? 0,
        utilities: userInfo?.utilities ?? 0,
        insurance: userInfo?.insurance ?? 0,
        food: userInfo?.food ?? 0,
        transportation: userInfo?.transportation ?? 0,
        healthcare: userInfo?.healthcare ?? 0,
        education: userInfo?.education ?? 0,
        entertainment: userInfo?.entertainment ?? 0,
        personalCare: userInfo?.personalCare ?? 0,
        childcare: userInfo?.childcare ?? 0,
        miscellaneous: userInfo?.miscellaneous ?? 0,
      },
      goals: {
        shortTermGoals: (userInfo?.shortTermGoals ?? []).map((goal) => ({
          description: goal.description,
          targetAmount: goal.targetAmount,
          timeline: goal.timeline,
          priority: ["high", "medium", "low"].includes(goal.priority)
            ? (goal.priority as "high" | "medium" | "low")
            : undefined,
        })),
        longTermGoals: (userInfo?.longTermGoals ?? []).map((goal) => ({
          description: goal.description,
          targetAmount: goal.targetAmount,
          timeline: goal.timeline,
          priority: ["high", "medium", "low"].includes(goal.priority)
            ? (goal.priority as "high" | "medium" | "low")
            : undefined,
        })),
        riskTolerance: userInfo?.riskTolerance ?? "",
      },
      lifestyle: {
        spendingHabits: userInfo?.spendingHabits ?? "",
        carPreferences: {
          type: userInfo?.carType ?? "",
          newOrUsed: userInfo?.carNewOrUsed ?? "",
          budget: userInfo?.carBudget ?? 0,
          brandPreference: userInfo?.carBrandPreference ?? "",
          financingPreference: userInfo?.carFinancingPreference ?? "",
        },
        plannedPurchases: userInfo?.plannedPurchases ?? [],
      },
      additionalContext: {
        creditScore: userInfo?.creditScore ?? 0,
        jobStability: userInfo?.jobStability ?? "",
        retirementAge: userInfo?.retirementAge ?? 0,
        emergencyFundMonths: userInfo?.emergencyFundMonths ?? 0,
        taxRate: userInfo?.taxRate ?? 0,
      },
    },
  });

  const { trigger, getValues } = methods;

  const nextStep = async () => {
    const currentStepFields = getStepFields(currentStep);
    const isValid = await trigger(currentStepFields);

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (!isValid) {
      toast.error("Please fill in all required fields correctly.");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("called");
    setIsSubmitting(true);
    try {
      console.log("Form Data:", data);
      const res = await onboardNewUser(data);
      console.log(res);

      toast.success("Your financial profile has been created successfully!");
      router.push("/chat");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepFields = (stepIndex: number): (keyof FormData)[] => {
    const fieldMap: Record<number, (keyof FormData)[]> = {
      0: ["personalInfo"],
      1: ["income"],
      2: ["assets"],
      3: ["debts"],
      4: ["expenses"],
      5: ["goals"],
      6: ["lifestyle"],
      7: ["additionalContext"],
    };
    return fieldMap[stepIndex] || [];
  };

  const handleSubmit = () => {
    const data = getValues();
    onSubmit(data);
  };

  // Check if step is valid for next button
  const isStepValid = () => {
    const data = getValues();
    switch (currentStep) {
      case 0:
        return (
          data.personalInfo.name.trim() !== "" && data.personalInfo.age > 0
        );
      case 1:
        return (
          data.income.primaryIncome > 0 && data.income.occupation.trim() !== ""
        );
      case 2:
        return data.assets.cashSavings >= 0;
      case 3:
        return true; // Debts can be 0
      case 4:
        return data.expenses.housing >= 0;
      case 5:
        return data.goals.riskTolerance !== "";
      case 6:
        return true;
      default:
        return true;
    }
  };

  const StepComponent = steps[currentStep].component;

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      {/* Progress indicator */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className={cn(
                  "w-4 h-4 rounded-full cursor-pointer transition-colors duration-300",
                  index < currentStep
                    ? "bg-primary"
                    : index === currentStep
                    ? "bg-primary ring-4 ring-primary/20"
                    : "bg-muted"
                )}
                onClick={() => {
                  // Only allow going back or to completed steps
                  if (index <= currentStep) {
                    setCurrentStep(index);
                  }
                }}
                whileTap={{ scale: 0.95 }}
              />
              <motion.span
                className={cn(
                  "text-xs mt-1.5 hidden sm:block",
                  index === currentStep
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </motion.span>
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border shadow-md rounded-3xl overflow-hidden p-8">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <StepComponent />
                  </form>
                </FormProvider>
              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex justify-between pt-8 pb-4 px-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1 transition-all duration-300 rounded-2xl"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  onClick={
                    currentStep === steps.length - 1 ? handleSubmit : nextStep
                  }
                  disabled={!isStepValid() || isSubmitting}
                  className={cn(
                    "flex items-center gap-1 transition-all duration-300 rounded-2xl",
                    currentStep === steps.length - 1 ? "" : ""
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      {currentStep === steps.length - 1
                        ? "Complete Profile"
                        : "Next"}
                      {currentStep === steps.length - 1 ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </div>
        </Card>
      </motion.div>

      {/* Step indicator */}
      <motion.div
        className="mt-4 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </motion.div>
    </div>
  );
};

export default MultiStepForm;
