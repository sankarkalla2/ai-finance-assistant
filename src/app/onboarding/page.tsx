import { auth } from "@/lib/auth";
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
  console.log(userInfo)

  return <OnboardingView userInfo={userInfo} />;
};

export default onboarding;
