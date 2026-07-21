"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center p-6 text-center rounded-lg border border-destructive/20 bg-destructive/10 text-destructive">
          <AlertCircle className="h-10 w-10 mb-2 opacity-80" />
          <h3 className="font-semibold mb-1">Component Error</h3>
          <p className="text-sm opacity-80">This section failed to load. Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
