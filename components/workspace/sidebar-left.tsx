"use client";

import * as React from "react";
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

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "#" },
  { title: "Decisions", icon: Target, url: "#", isActive: true },
  { title: "Timeline", icon: Clock, url: "#" },
  { title: "Archive", icon: Archive, url: "#" },
];

export function SidebarLeft() {
  return (
    <Sidebar className="border-r border-border/50 bg-background/50 backdrop-blur-xl transition-all duration-300">
      <SidebarHeader className="p-4 flex flex-row items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <Command className="size-4" />
        </div>
        <span className="font-heading text-lg font-bold tracking-widest uppercase">ASTRA</span>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-4">
          <Button className="w-full justify-start shadow-sm h-10" size="sm">
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
                  <SidebarMenuButton render={<a href={item.url} className="transition-all hover:bg-secondary/50 py-5" />} isActive={item.isActive} tooltip={item.title}>
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
                <SidebarMenuButton render={<a href="#" className="transition-all hover:bg-secondary/50 py-5" />} tooltip="Settings">
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
