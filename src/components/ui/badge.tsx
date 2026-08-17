import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap w-fit [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border-transparent",
        secondary: "bg-secondary text-secondary-foreground border-transparent",
        outline: "border-border text-foreground",
        success: "bg-brand-mint/20 text-emerald-700 border-transparent",
        warning: "bg-brand-yellow/30 text-amber-800 border-transparent",
        destructive: "bg-destructive/10 text-destructive border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
