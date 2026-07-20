import * as React from "react";
import { MainNav } from "@/components/layout/nav";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <MainNav />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
