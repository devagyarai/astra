import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/workspace/sidebar-left";
import { SidebarRight } from "@/components/workspace/sidebar-right";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-background">
          <SidebarLeft />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          <SidebarRight />
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
