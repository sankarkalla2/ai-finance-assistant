import {
  generateAIAssistantPrompt,
  generateContextualPrompt,
} from "./ai-assistant-prompt";
import { getUserInfo } from "@/modules/onboarding/server/onboarding-user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Example 1: Generate base prompt for AI assistant
export async function getBaseAIPrompt() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  // Get user info from database
  const userInfoResult = await getUserInfo(session.user.id);

  if (!userInfoResult.success || !userInfoResult.data) {
    throw new Error("User onboarding data not found");
  }

  // Convert database data to FormData format
  const userData = convertUserInfoToFormData(userInfoResult.data);

  // Generate the comprehensive AI prompt
  return generateAIAssistantPrompt(userData);
}

// Example 2: Generate contextual prompt for specific user query
export async function getContextualAIPrompt(userQuery: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  // Get user info from database
  const userInfoResult = await getUserInfo(session.user.id);

  if (!userInfoResult.success || !userInfoResult.data) {
    throw new Error("User onboarding data not found");
  }

  // Convert database data to FormData format
  const userData = convertUserInfoToFormData(userInfoResult.data);

  // Generate contextual prompt with user's specific query
  return generateContextualPrompt(userData, userQuery);
}

// Example 3: Integration with chat API
export async function createChatMessageWithUserContext(userMessage: string) {
  try {
    const contextualPrompt = await getContextualAIPrompt(userMessage);

    // This would be sent to your AI service (OpenAI, Anthropic, etc.)
    const aiResponse = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: contextualPrompt,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    return await aiResponse.json();
  } catch (error) {
    console.error("Error creating chat message:", error);
    throw error;
  }
}

// Helper function to convert database user info to FormData format
function convertUserInfoToFormData(userInfo: any) {
  return {
    personalInfo: {
      name: userInfo.name,
      age: userInfo.age,
      gender: userInfo.gender,
      maritalStatus: userInfo.maritalStatus,
      location: userInfo.location,
      dependents: userInfo.dependents || [],
    },
    income: {
      primaryIncome: userInfo.primaryIncome,
      occupation: userInfo.occupation,
      jobType: userInfo.jobType,
      extraIncome: userInfo.extraIncome,
      incomeFrequency: userInfo.incomeFrequency,
    },
    assets: {
      cashSavings: userInfo.cashSavings,
      investments: userInfo.investments,
      realEstate: userInfo.realEstate,
      vehicles: userInfo.vehicles,
      otherAssets: userInfo.otherAssets,
      liquidAssets: userInfo.liquidAssets,
    },
    debts: {
      loans: userInfo.loans || [],
      mortgage: {
        balance: userInfo.mortgageBalance,
        interestRate: userInfo.mortgageInterestRate,
        monthlyPayment: userInfo.mortgageMonthlyPayment,
        yearsLeft: userInfo.mortgageYearsLeft,
      },
      creditCardDebt: userInfo.creditCardDebt,
      otherLiabilities: userInfo.otherLiabilities,
      existingEMIs: userInfo.existingEMIs || [],
    },
    expenses: {
      housing: userInfo.housing,
      utilities: userInfo.utilities,
      insurance: userInfo.insurance,
      food: userInfo.food,
      transportation: userInfo.transportation,
      healthcare: userInfo.healthcare,
      education: userInfo.education,
      entertainment: userInfo.entertainment,
      personalCare: userInfo.personalCare,
      childcare: userInfo.childcare,
      miscellaneous: userInfo.miscellaneous,
    },
    goals: {
      shortTermGoals: userInfo.shortTermGoals || [],
      longTermGoals: userInfo.longTermGoals || [],
      riskTolerance: userInfo.riskTolerance,
    },
    lifestyle: {
      spendingHabits: userInfo.spendingHabits,
      carPreferences: {
        type: userInfo.carType,
        newOrUsed: userInfo.carNewOrUsed,
        budget: userInfo.carBudget,
        brandPreference: userInfo.carBrandPreference,
        financingPreference: userInfo.carFinancingPreference,
      },
      plannedPurchases: userInfo.plannedPurchases || [],
    },
    additionalContext: {
      creditScore: userInfo.creditScore,
      jobStability: userInfo.jobStability,
      retirementAge: userInfo.retirementAge,
      emergencyFundMonths: userInfo.emergencyFundMonths,
      taxRate: userInfo.taxRate,
    },
  };
}

// Example 4: Usage in a React component
export function useAIAssistant() {
  const sendMessage = async (message: string) => {
    try {
      const response = await createChatMessageWithUserContext(message);
      return response;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  return { sendMessage };
}
