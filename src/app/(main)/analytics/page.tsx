import { getUserInfo } from "@/app/server/user";
import { auth } from "@/lib/auth";
import AnalyticsPageView from "@/modules/analytics/ui/views/analytics-view";
import { QueryClient } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AnalyticsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return redirect("/sign-in");
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["get-user-data"],
    queryFn: () => getUserInfo(session.user.id),
  });

  return <AnalyticsPageView userId={session.user.id}/>;
};

export default AnalyticsPage;
