import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-[120px] w-full rounded-md border-2 border-[#E0E0E0] bg-white px-4 py-3 text-base text-[#333333] transition-all outline-none resize-y",
        "placeholder:text-[#999999]",
        "focus:border-[#4A90E2] focus:ring-3 focus:ring-[#4A90E2]/10",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F1F1F1]",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
