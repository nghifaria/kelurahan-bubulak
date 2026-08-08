import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-emerald-700 text-white hover:bg-emerald-800",
        outline:
          "border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-900",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost:
          "bg-transparent hover:bg-muted/50 text-slate-900",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:border-red-600 focus-visible:ring-red-200",
        link: "text-emerald-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 gap-2 px-6 rounded-2xl min-h-[44px] min-w-[44px]",
        xs: "h-8 gap-1 px-2 rounded-lg text-xs",
        sm: "h-10 gap-1 px-4 rounded-xl",
        lg: "h-14 gap-2 px-8 rounded-3xl",
        icon: "size-8",
        "icon-xs": "size-6 rounded-lg",
        "icon-sm": "size-7 rounded-xl",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
