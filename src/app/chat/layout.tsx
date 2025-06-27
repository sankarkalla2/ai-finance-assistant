import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/modules/chat/components/chat-app-sidebar";
import React from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
}
const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default ChatLayout;
