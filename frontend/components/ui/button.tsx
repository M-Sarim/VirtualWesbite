import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#D30B5F] text-white hover:bg-[#404040] hover:text-white focus-visible:ring-[#D30B5F] shadow-lg hover:shadow-xl active:transform active:scale-95",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive shadow-sm",
        outline:
          "border-2 border-[#D30B5F] bg-transparent text-[#D30B5F] hover:bg-[#404040] hover:text-white hover:border-[#404040] focus-visible:ring-[#D30B5F]",
        secondary:
          "bg-[#007A52] text-white hover:bg-[#404040] hover:text-white focus-visible:ring-[#007A52] shadow-md",
        ghost: "hover:bg-[#F1F1F1] hover:text-[#262626]",
        link: "text-[#D30B5F] underline-offset-4 hover:underline hover:text-[#404040]",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-base rounded-full",
        sm: "h-9 rounded-full px-4 py-2 text-sm",
        lg: "h-14 rounded-full px-10 py-4 text-lg",
        icon: "size-11 rounded-full",
        "icon-sm": "size-9 rounded-full",
        "icon-lg": "size-14 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
