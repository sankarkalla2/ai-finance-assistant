"use client";

import { Button } from "./ui/button";
import { ArrowRight, PanelRight } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MobileSidebarOpen() {
  const { isMobile, setOpenMobile, openMobile } = useSidebar();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpenMobile(!openMobile)}
          aria-label="Toggle Sidebar"
        >
          <PanelRight className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Open sidebar</TooltipContent>
    </Tooltip>
  );
}
