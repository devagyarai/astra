"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log to error reporting service
    console.error("Global crash:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          <div className="max-w-md w-full p-8 rounded-xl border bg-card text-card-foreground shadow-sm text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-destructive mb-4">
              System Error
            </h2>
            <p className="text-muted-foreground mb-8">
              Astra encountered an unexpected error. Your local data is safe, but we need to reload the application to recover.
            </p>
            <Button onClick={() => reset()} className="w-full">
              Reload Astra
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
