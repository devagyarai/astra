"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Target, 
  Clock, 
  Archive, 
  Settings, 
  Plus,
  Command
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function SidebarLeft() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    { title: "Decisions", icon: Target, url: "/workspace" },
    { title: "Timeline", icon: Clock, url: "/timeline" },
    { title: "Archive", icon: Archive, url: "/archive" },
  ];

  const handleNewDecision = () => {
    import("@/lib/storage").then(({ storage }) => {
      storage.setActiveDecisionId("new");
      router.push("/workspace");
    });
  };

  return (
    <Sidebar className="border-r border-border/50 bg-background/50 backdrop-blur-xl transition-all duration-300">
      <SidebarHeader className="p-4 flex flex-row items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Command className="size-4" />
          </div>
          <span className="font-heading text-lg font-bold tracking-widest uppercase transition-colors group-hover:text-primary">ASTRA</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-4">
          <Button onClick={handleNewDecision} className="w-full justify-start shadow-sm h-10" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Decision
          </Button>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-2">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    render={<Link href={item.url} className="transition-all hover:bg-secondary/50 py-5" />} 
                    isActive={pathname === item.url} 
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto pb-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  render={<Link href="/settings" className="transition-all hover:bg-secondary/50 py-5" />} 
                  isActive={pathname === "/settings"}
                  tooltip="Settings"
                >
                  <Settings className="h-4 w-4" />
                  <span className="font-medium">Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
