import { auth } from "@/lib/auth";
import { getAllSubscriptions } from "@/modules/upgrade/server/upgrade";
import UpgradView from "@/modules/upgrade/ui/views/upgrade-view";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  usePrefetchQuery,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Upgrade = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return redirect("/sign-in");

  const client = new QueryClient();
  void client.prefetchQuery({
    queryKey: ["get-subscriptions"],
    queryFn: () => getAllSubscriptions(),
  });
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <UpgradView />
    </HydrationBoundary>
  );
};

export default Upgrade;
