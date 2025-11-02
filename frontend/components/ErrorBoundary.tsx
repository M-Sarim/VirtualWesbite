import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 gradient-mesh"
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-md w-full glass rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle
              className="w-6 h-6 text-destructive"
              aria-hidden="true"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">
              We encountered an unexpected error
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 max-h-40 overflow-auto">
          <code className="text-xs text-destructive break-all">
            {error.message}
          </code>
        </div>

        <Button
          onClick={resetErrorBoundary}
          className="w-full gap-2"
          aria-label="Try again"
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          Try again
        </Button>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log to error reporting service in production
        console.error("Error caught by boundary:", error, errorInfo);
      }}
      onReset={() => {
        // Reset app state here if needed
        window.location.href = "/";
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
