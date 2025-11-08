import { Loader2 } from "lucide-react";

interface LoadingProps {
  fullScreen?: boolean;
  text?: string;
}

export function Loading({
  fullScreen = false,
  text = "Loading...",
}: LoadingProps) {
  const content = (
    <div
      className="flex flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <Loader2
        className="w-8 h-8 animate-spin text-primary"
        aria-hidden="true"
      />
      <p className="text-sm text-muted-foreground">{text}</p>
      <span className="sr-only">{text}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh">
        {content}
      </div>
    );
  }

  return content;
}

export function SkeletonCard() {
  return (
    <div
      className="rounded-xl border p-6 space-y-4 animate-pulse"
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4 shimmer" />
        <div className="h-4 bg-muted rounded w-1/2 shimmer" />
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded shimmer" />
        <div className="h-3 bg-muted rounded w-5/6 shimmer" />
        <div className="h-3 bg-muted rounded w-4/6 shimmer" />
      </div>
      <div className="h-10 bg-muted rounded shimmer" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2" aria-busy="true" aria-label="Loading text">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-muted rounded shimmer ${
            i === lines - 1 ? "w-3/4" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar() {
  return (
    <div
      className="w-10 h-10 bg-muted rounded-full shimmer"
      aria-busy="true"
      aria-label="Loading avatar"
    />
  );
}
