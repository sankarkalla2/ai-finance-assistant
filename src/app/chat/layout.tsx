import { MobileSidebarOpen } from "@/components/mobile-sidebar-open";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { AppSidebar } from "@/modules/chat/components/chat-app-sidebar";
import { getUserHistory } from "@/modules/chat/server/chats";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  queryOptions,
} from "@tanstack/react-query";
import React from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
}
const ChatLayout = async ({ children }: ChatLayoutProps) => {
  const queryClient = new QueryClient();
  void queryClient.prefetchQuery(
    queryOptions({
      queryKey: ["get-history"],
      queryFn: getUserHistory,
    })
  );

  return (
    <SidebarProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AppSidebar />
      </HydrationBoundary>
      <SidebarInset>
        <MobileSidebarOpen />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ChatLayout;
