
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-headspace-orange/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-headspace-orange text-white hover:bg-headspace-orange-dark shadow-lg hover:shadow-xl hover:scale-105 transform",
        "primary-cta": "relative px-8 py-4 text-lg font-semibold rounded-3xl bg-gradient-to-r from-headspace-orange to-headspace-orange-light hover:from-headspace-orange-dark hover:to-headspace-orange shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl text-white transform hover:-translate-y-1 active:scale-95",
        "secondary-cta": "px-6 py-3 text-base font-medium rounded-2xl bg-headspace-blue text-white hover:bg-headspace-blue-dark shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl transform hover:-translate-y-0.5",
        gentle: "px-6 py-3 text-base font-medium rounded-2xl bg-headspace-green/10 text-headspace-green-dark hover:bg-headspace-green/20 border border-headspace-green/20 hover:border-headspace-green/30 transition-all duration-200",
        destructive: "bg-red-500 text-white hover:bg-red-600 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transform",
        outline: "border-2 border-headspace-neutral-200 bg-white hover:bg-headspace-neutral-50 hover:border-headspace-orange/30 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200",
        secondary: "bg-headspace-neutral-100 text-headspace-neutral-700 hover:bg-headspace-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200",
        ghost: "hover:bg-headspace-neutral-100 hover:text-headspace-neutral-900 rounded-2xl transition-all duration-200",
        link: "text-headspace-blue underline-offset-4 hover:underline hover:text-headspace-blue-dark transition-colors duration-200",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-xl px-4 text-sm",
        lg: "h-12 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-3xl px-12 text-xl",
        icon: "h-11 w-11 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
