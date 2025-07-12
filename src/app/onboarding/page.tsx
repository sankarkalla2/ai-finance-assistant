import { auth } from "@/lib/auth";
import FinancialPlanningForm from "@/modules/onboarding/components/onboarding-planning-form";
import { getUserInfo } from "@/modules/onboarding/server/onboarding-user";
import OnboardingView from "@/modules/onboarding/views/onboarding-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const onboarding = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return redirect("/sign-in");

  const data = await getUserInfo(session.user.id);
  const userInfo = data.data;
  console.log(userInfo);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-white dark:bg-black">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold  mb-2">
          Financial Planning Assessment
        </h1>
        <p className="text-muted-foreground">
          Help us understand your financial situation to provide personalized
          advice
        </p>
      </div>
      <FinancialPlanningForm userInfo={userInfo} />
    </div>
  );
};

export default onboarding;
