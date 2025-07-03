"use client";

import {
  ChevronRight,
  ChevronsRight,
  Ellipsis,
  History,
  MessageSquareIcon,
  type LucideIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { formatDateWithTime } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    id: string;
    createdAt: Date;
    userId: string;
    title: string;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        <SidebarGroupLabel>Chats</SidebarGroupLabel>
        {items.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              tooltip={"title"}
              size={"lg"}
              isActive={pathname.split("/")[2] === item.id}
              asChild
            >
              <Link href={`/chat/${item.id}`}>
                <ChevronsRight className="text-primary" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-xs font-medium">{item.title}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {formatDateWithTime(item.createdAt)}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
