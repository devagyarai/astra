"use client";

import * as React from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function MainNav() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-heading text-xl font-bold tracking-widest uppercase transition-opacity group-hover:opacity-80">
              ASTRA
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["Documentation", "Features", "Pricing"].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-secondary-foreground/60 transition-colors hover:text-foreground"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-full h-10 w-10 text-secondary-foreground/60 hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
