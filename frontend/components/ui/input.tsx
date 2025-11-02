import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full rounded-md border-2 border-[#E0E0E0] bg-white px-4 py-3 text-base text-[#333333] transition-all outline-none",
        "placeholder:text-[#999999]",
        "focus:border-[#4A90E2] focus:ring-3 focus:ring-[#4A90E2]/10",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F1F1F1]",
        "file:inline-flex file:h-9 file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-[#333333]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
