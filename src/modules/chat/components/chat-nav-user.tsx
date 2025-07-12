"use client";

import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  Computer,
  CreditCard,
  Loader2,
  LogOut,
  Monitor,
  Moon,
  Palette,
  Settings,
  Sparkles,
  Sun,
  TriangleAlert,
  User2Icon,
  Zap,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import ModalProvider from "@/components/modal-provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteUserAccont } from "@/app/server/user";
import { toast } from "sonner";
import { useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserCurrentActiveSubscription } from "@/modules/upgrade/server/upgrade";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface NavUserProps {
  name: string;
  email: string;
  avatar: string | undefined | null;
}
export function NavUser({ name, email, avatar }: NavUserProps) {
  const { isMobile } = useSidebar();
  const { setTheme } = useTheme();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: currenSubscription, isLoading } = useQuery({
    queryKey: ["get-active-user-subscription"],
    queryFn: () => getUserCurrentActiveSubscription(),
  });

  const handleDeleteAccount = async () => {
    startTransition(async () => {
      const res = await deleteUserAccont();
      if (res.status === 200) {
        toast.success(res.mesasge);
        await authClient.signOut({
          fetchOptions: {
            onSuccess: async () => {
              router.push("/sign-in");
            },
          },
        });
      } else toast.error(res.mesasge);
    });
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatar ?? ""} alt={name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar ?? ""} alt={name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuGroup>
              {/* <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <ModalProvider
                  title="Account"
                  description="See yourself in"
                  trigger={
                    <div className="flex items-center gap-2 rounded-md cursor-pointer hover:bg-sidebar-accent px-2 py-2 text-sm">
                      <User2Icon className="size-4 text-muted-foreground" />
                      Account
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-4 items-center w-full">
                      <Label className="text-sm col-span-3">Name</Label>
                      <Input
                        type="text"
                        value={name}
                        className="col-span-9"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <Label className="text-sm col-span-3">Email</Label>
                      <Input
                        type="email"
                        value={email}
                        className="col-span-9"
                        disabled
                      />
                    </div>

                    <Separator />

                    <div>
                      <div className="text-sm flex justify-between items-center">
                        <span className="flex  h-full items-center gap-2 text-red-500">
                          <TriangleAlert className="h-4 w-4" />
                          Delete Account
                        </span>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="w-fit cursor-pointer"
                            >
                              {isPending ? (
                                <div className="flex items-center gap-2">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Deleting...
                                </div>
                              ) : (
                                "Delete"
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteAccount}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Warning: This action cannot be undone. This will
                      permanently delete your account and remove your data from
                      our servers.
                    </p>
                  </div>
                </ModalProvider>
                {/* <BadgeCheck />
                Account */}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <ModalProvider
                  title="Billing"
                  description="Manage billing"
                  trigger={
                    <div className="flex items-center gap-2 rounded-md cursor-pointer hover:bg-sidebar-accent px-2 py-2 text-sm">
                      <CreditCard className="size-4 text-muted-foreground" />
                      Billing
                    </div>
                  }
                >
                  <div>
                    <div>
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      ) : (
                        <Alert>
                          <AlertTitle>
                            <div className="flex items-center gap-2">
                              <CreditCard /> Subscription Status
                            </div>
                          </AlertTitle>
                          <AlertDescription className="w-full mt-5">
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Current Plan
                                </p>
                                <p className="text-lg font-semibold flex items-center gap-2">
                                  {currenSubscription ? "Pro" : "Free"}
                                  {currenSubscription && (
                                    <Badge
                                      variant="secondary"
                                      className="bg-primary/10 text-primary"
                                    >
                                      Active
                                    </Badge>
                                  )}
                                  {!currenSubscription && (
                                    <Badge variant="outline">
                                      No Subscription
                                    </Badge>
                                  )}
                                </p>
                              </div>

                              {!currenSubscription && (
                                <Button className="bg-primary hover:bg-primary/90">
                                  <Link href="/pricing">
                                    <Zap className="mr-2 h-4 w-4" />
                                    View Pricing
                                  </Link>
                                </Button>
                              )}
                              {currenSubscription && (
                                <Button
                                  className="bg-primary hover:bg-primary/90"
                                  onClick={() => authClient.customer.portal()}
                                >
                                  <>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Manage Billing
                                  </>
                                </Button>
                              )}
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </ModalProvider>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () =>
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/sign-in");
                      },
                    },
                  })
                }
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex gap-x-2 items-center">
                  <Palette className="size-4 text-muted-foreground" />
                  Theme
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun />
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon />
                      Dark
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Monitor onClick={() => setTheme("system")} />
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
