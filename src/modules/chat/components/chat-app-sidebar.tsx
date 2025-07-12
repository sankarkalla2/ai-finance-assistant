"use client";
import { Slider } from "@/components/ui/slider";
import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  CommandIcon,
  CreditCard,
  Ellipsis,
  Frame,
  GalleryVerticalEnd,
  History,
  LogIn,
  Map,
  MessagesSquare,
  PieChart,
  Plus,
  Settings2,
  SidebarIcon,
  SquareTerminal,
  UserPlus,
} from "lucide-react";

import { NavMain } from "./chat-nav-main";
import { NavUser } from "./chat-nav-user";
import { TeamSwitcher } from "./theme-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUserHistory } from "../server/chats";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserCurrentActiveSubscription } from "@/modules/upgrade/server/upgrade";
import ModalProvider from "@/components/modal-provider";
import UserFeedback from "./user-feedback";
import { RainbowButton } from "@/components/magicui/rainbow-button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = authClient.useSession();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-history"],
    queryFn: getUserHistory,
  });
  const { toggleSidebar, open } = useSidebar();
  const { data: currenSubscription, isLoading: loading } = useQuery({
    queryKey: ["get-active-user-subscription"],
    queryFn: () => getUserCurrentActiveSubscription(),
  });

  const isPro = loading ? true : !!currenSubscription;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="w-full">
                <a href="#" className="flex items-center gap-x-2">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-5 items-center justify-center rounded-lg">
                    <CommandIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                  </div>
                </a>
                <SidebarIcon className="ml-auto" onClick={toggleSidebar} />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={"new chat"} asChild>
                <Link href={"/chat"}>
                  <Plus />
                  New Chat
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {isLoading && open && (
          <SidebarGroup>
            <SidebarMenu>
              <SidebarGroupLabel>Chats</SidebarGroupLabel>
              {Array.from({ length: 5 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                  <Skeleton className="w-full h-9 mb-2" />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
        {data?.data && <NavMain items={data.data} />}

        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {!isPro && open && (
            <Card className="gap-2 py-4 shadow-none">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Upgrade to Pro</CardTitle>
                <CardDescription>
                  Get access to all features and support.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 w-full">
                <Link href={"/upgrade"}>
                  <Button className="w-full cursor-pointer" variant="premium">
                    <CreditCard />
                    Upgrade
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
          {session && session?.data?.user && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={"Onboarding"}>
                <Link href="/onboarding">
                  <UserPlus />
                  Onboarding
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton
              className={cn(open && "hidden")}
              tooltip={"open"}
            >
              <SidebarIcon onClick={toggleSidebar} />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <UserFeedback />
          </SidebarMenuItem>
          {session.isPending ? (
            <Skeleton className="w-full h-10" />
          ) : session.data?.user ? (
            <NavUser
              avatar={session.data.user.image}
              name={session.data.user.name}
              email={session.data.user.email}
            />
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive
                className="font-semibold"
                asChild
                tooltip={"login"}
              >
                <Link href={"/sign-in"}>
                  <LogIn />
                  <span className="">Login</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
