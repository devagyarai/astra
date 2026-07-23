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
  Search,
  MoreVertical,
  Copy,
  Trash2,
  PenLine
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
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { BrandIcon } from "@/components/ui/brand-logo";
import { cn } from "@/lib/utils";

export function SidebarLeft() {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { 
    decisions, 
    activeDecisionId, 
    searchQuery, 
    setSearchQuery, 
    createDecision, 
    switchDecision, 
    duplicateDecision, 
    deleteDecision,
    renameDecision
  } = useWorkspace();

  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editTitle, setEditTitle] = React.useState("");

  const handleCreateNew = () => {
    createDecision();
    if (pathname !== "/workspace") {
      router.push("/workspace");
    }
  };

  const handleSwitchDecision = (id: string) => {
    switchDecision(id);
    if (pathname !== "/workspace") {
      router.push("/workspace");
    }
  };

  const handleRenameSubmit = (id: string) => {
    if (editTitle.trim()) {
      renameDecision(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    { title: "Timeline", icon: Clock, url: "/timeline" },
    { title: "Archive", icon: Archive, url: "/archive" },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-background/50 backdrop-blur-xl transition-all duration-300">
      <SidebarHeader className={cn("p-4 flex border-b border-border/40 transition-all duration-300", isCollapsed ? "justify-center px-2 py-4" : "flex-row items-center justify-between")}>
        <Link href="/dashboard" className="flex items-center gap-2.5 group shrink-0">
          <BrandIcon className="h-6 w-6 transition-transform group-hover:scale-105" />
          {!isCollapsed && (
            <span className="font-heading text-lg font-bold tracking-widest uppercase transition-colors group-hover:text-primary">ASTRA</span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-[calc(100vh-5rem)] overflow-hidden">
        {/* Navigation Menu (Top) */}
        <SidebarGroup className="px-2 pt-4 pb-2">
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-2">Menu</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url} className="w-full">
                    <SidebarMenuButton 
                      isActive={pathname === item.url} 
                      tooltip={item.title}
                      className="transition-all hover:bg-secondary/50"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Workspace Manager (Middle - flex-1) */}
        <div className="flex-1 overflow-hidden flex flex-col px-2 pt-4 border-t border-border/40">
          {!isCollapsed ? (
            <div className="flex items-center justify-between px-2 mb-2 shrink-0">
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/60 p-0">Workspace</SidebarGroupLabel>
              <Button aria-label="New Decision" onClick={handleCreateNew} variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-primary/10 hover:text-primary">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center mb-2 shrink-0">
              <Button aria-label="New Decision" onClick={handleCreateNew} variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-primary/10 hover:text-primary">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {!isCollapsed && (
            <div className="px-2 mb-3 relative shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input 
                placeholder="Search decisions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 text-xs pl-8 bg-secondary/30 border-none shadow-none"
              />
            </div>
          )}

          <div className="flex-1 overflow-y-auto space-y-1 px-2 pb-4 scrollbar-thin">
            {decisions.length === 0 ? (
              <div className="text-center py-6 px-2">
                <Target className="h-6 w-6 text-muted-foreground/30 mx-auto mb-2" />
                {!isCollapsed && <p className="text-xs text-muted-foreground">No decisions found.</p>}
              </div>
            ) : (
              <SidebarMenu>
                {decisions.map(dec => (
                  <SidebarMenuItem key={dec.id}>
                    {isCollapsed ? (
                      <SidebarMenuButton
                        isActive={activeDecisionId === dec.id && pathname === "/workspace"}
                        onClick={() => handleSwitchDecision(dec.id)}
                        tooltip={dec.title || "Untitled Decision"}
                        className="transition-all hover:bg-secondary/50"
                      >
                        <Target className="h-4 w-4 shrink-0" />
                        <span className="truncate">{dec.title || "Untitled Decision"}</span>
                      </SidebarMenuButton>
                    ) : (
                      <div 
                        className={`group relative flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${activeDecisionId === dec.id && pathname === "/workspace" ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-secondary text-foreground/80'}`}
                        onClick={() => handleSwitchDecision(dec.id)}
                      >
                        {editingId === dec.id ? (
                          <Input 
                            value={editTitle}
                            autoFocus
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={() => handleRenameSubmit(dec.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleRenameSubmit(dec.id);
                              if (e.key === "Escape") setEditingId(null);
                            }}
                            className="h-6 text-xs px-1.5 py-0 border-primary bg-background"
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <div className="flex flex-col overflow-hidden min-w-0 pr-6">
                            <span className="text-sm truncate">{dec.title || "Untitled Decision"}</span>
                            <span className="text-[10px] text-muted-foreground truncate opacity-70">
                              {formatDistanceToNow(new Date(dec.updatedAt), { addSuffix: true })}
                            </span>
                          </div>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger 
                            onClick={(e) => e.stopPropagation()} 
                            className="h-6 w-6 absolute right-2 opacity-0 group-hover:opacity-100 data-open:opacity-100 flex items-center justify-center rounded-md hover:bg-secondary cursor-pointer border-none bg-transparent"
                          >
                            <MoreVertical className="h-3 w-3" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setEditTitle(dec.title); setEditingId(dec.id); }}>
                              <PenLine className="h-3 w-3 mr-2" /> Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); duplicateDecision(dec.id); }}>
                              <Copy className="h-3 w-3 mr-2" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                if(confirm("Are you sure you want to delete this decision?")) {
                                  deleteDecision(dec.id); 
                                }
                              }}
                            >
                              <Trash2 className="h-3 w-3 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </div>
        </div>
        
        {/* Settings/Bottom Menu (Bottom) */}
        <SidebarGroup className="mt-auto border-t border-border/40 pt-2 pb-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/settings" className="w-full">
                  <SidebarMenuButton 
                    isActive={pathname === "/settings"}
                    tooltip="Settings"
                    className="transition-all hover:bg-secondary/50"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="font-medium text-sm">Settings</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
