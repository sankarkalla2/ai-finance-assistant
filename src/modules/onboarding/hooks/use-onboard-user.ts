import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { leanFormSchema } from "../lib/onboarding-form";
import { OnboardedUserType } from "../types";
import { onboardNewUser } from "../server/onboarding-user";
import { toast } from "sonner";
import { z } from "zod";

export const useOnboarduser = (userInfo: OnboardedUserType) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(leanFormSchema),
    mode: "onChange",
    defaultValues: {
      personalInfo: {
        name: userInfo?.userInfo?.name || "", // Empty string for placeholder
        age: userInfo?.userInfo?.age || 0, // Minimal default for numbers
        country: userInfo?.userInfo?.country || "",
        state: userInfo?.userInfo?.state || "",
        dependents: userInfo?.userInfo?.dependents || 0,
      },
      income: {
        monthlyIncome: userInfo?.userInfo?.totalIncome || 0,
        extraIncome: 0,
        occupation: userInfo?.userInfo?.occupation || "",
        incomeFrequency: userInfo?.userInfo?.incomeFrequency || "monthly",
        jobStability: userInfo?.userInfo?.jobStability || "stable",
      },
      expenses: {
        totalMonthlyExpenses: userInfo?.userInfo?.totalMonthlyExpenses || 0,
        housing: userInfo?.userInfo?.housing || 0,
        transportation: userInfo?.userInfo?.transportation || 0,
        food: userInfo?.userInfo?.miscellaneous || 0,
        subscriptions: userInfo?.userInfo?.subscription || 0,
        education: userInfo?.userInfo?.education || 0,
        miscallaneous: userInfo?.userInfo?.miscellaneous || 0,
      },
      debts: {
        totalDebt: userInfo?.userInfo?.totalDebt || 0,
        monthlyDebtPayment: userInfo?.userInfo?.monthlyDebtPayment || 0,
        creditScore: userInfo?.userInfo?.creditScore || 0,
        deptBreakDown: userInfo?.userInfo?.deptBreakDowns || [],
      },
      assets: {
        cashSavings: userInfo?.userInfo?.cashSavings || 0,
        investments: userInfo?.userInfo?.investments || 0,
        retirementSavings: userInfo?.userInfo?.retirementSavings || 0,
        realEstateValue: userInfo?.userInfo?.realEstateVAlue || 0, // Fixed typo
      },
      goals: {
        goals:
          userInfo?.userInfo?.goals?.map((goal) => ({
            description: goal.description || "",
            targetAmount: goal.targetAmount || 0,
            timeline: goal.timeline || "",
            priority: goal.priority || "medium",
          })) || [], // Empty array for dynamic fields
        riskTolerance: userInfo?.userInfo?.riskTolerance || "medium",
        retirementAge: userInfo?.userInfo?.retirementAge || 0, // Allow 0 for placeholder
      },
      emergencyFund: {
        monthsCovered: userInfo?.userInfo?.emergencyFundMonthsCovered || 0,
      },
      lifestyle: {
        spendingHabits: userInfo?.userInfo?.spendingHabits || "average",
        plannedBigPurchases:
          userInfo?.userInfo?.plannedPurchases?.map((purchase) => ({
            description: purchase || "",
          })) || [], // Empty array for dynamic fields
      },
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,

    formState: { errors },
  } = methods;

  const {
    fields: goalFields,
    append: appendGoal,
    remove: removeGoal,
  } = useFieldArray({
    control,
    name: "goals.goals",
  });

  const {
    fields: purchaseFields,
    append: appendPurchase,
    remove: removePurchase,
  } = useFieldArray({
    control,
    name: "lifestyle.plannedBigPurchases",
  });

  const {
    fields: debtFields,
    append: appendDebt,
    remove: removeDebt,
  } = useFieldArray({
    control,
    name: "debts.deptBreakDown",
  });

  const watchedValues = watch();

  const steps = [
    { id: "personal", title: "Personal Info" },
    { id: "income", title: "Income Details" },
    { id: "expenses", title: "Monthly Expenses" },
    { id: "debts", title: "Debts & Credit" },
    { id: "assets", title: "Assets & Savings" },
    { id: "goals", title: "Financial Goals" },
    { id: "emergency", title: "Emergency & Lifestyle" },
  ];
  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getFieldsForStep = (
    step: number
  ): (keyof z.infer<typeof leanFormSchema>)[] => {
    switch (step) {
      case 0:
        return ["personalInfo"];
      case 1:
        return ["income"];
      case 2:
        return ["expenses"];
      case 3:
        return ["debts"];
      case 4:
        return ["assets"];
      case 5:
        return ["goals"];
      case 6:
        return ["emergencyFund", "lifestyle"];
      default:
        return [];
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          !errors.personalInfo &&
          watchedValues.personalInfo?.name &&
          watchedValues.personalInfo?.age > 0
        );
      case 1:
        return (
          !errors.income &&
          watchedValues.income?.occupation &&
          watchedValues.income?.monthlyIncome >= 0
        );
      case 2:
        return !errors.expenses;
      case 3:
        return !errors.debts;
      case 4:
        return !errors.assets;
      case 5:
        return !errors.goals;
      case 6:
        return !errors.emergencyFund && !errors.lifestyle;
      default:
        return true;
    }
  };

  const onSubmit = async (data: z.infer<typeof leanFormSchema>) => {
    setIsSubmitting(true);

    console.log("Form submitted:", data);
    const res = await onboardNewUser(data);
    if (res.status === 200 || res.status === 201) {
      toast.success("Onboarding completed successfully");
      router.push("/chat");
      return;
    }
    toast.error("Something went wrong. Please try again.");
    setIsSubmitting(false);
  };

  return {
    currentStep,
    setCurrentStep,
    onSubmit,
    handleSubmit,
    control,
    errors,
    appendDebt,
    debtFields,
    removeDebt,
    appendGoal,
    goalFields,
    removeGoal,
    appendPurchase,
    purchaseFields,
    removePurchase,
    prevStep,
    nextStep,
    isStepValid,
    steps,
    methods,
    isSubmitting,
    
  };
};
