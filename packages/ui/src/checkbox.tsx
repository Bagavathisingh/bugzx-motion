'use client';

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Motion } from "@bugzx-motion/core"
import { cn } from "./utils"
import { cva, type VariantProps } from "class-variance-authority"

const checkboxVariants = cva(
    "peer h-5 w-5 shrink-0 rounded-md border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
    {
        variants: {
            variant: {
                default: "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                neon: "border-cyan-500/50 data-[state=checked]:border-cyan-400 data-[state=checked]:bg-cyan-500/10 data-[state=checked]:text-cyan-400 data-[state=checked]:shadow-[0_0_10px_rgba(6,182,212,0.4)]",
                minimal: "border-zinc-300 dark:border-zinc-700 data-[state=checked]:border-zinc-900 dark:data-[state=checked]:border-zinc-100 data-[state=checked]:bg-zinc-900 dark:data-[state=checked]:bg-zinc-100 data-[state=checked]:text-zinc-100 dark:data-[state=checked]:text-zinc-900",
                outline: "border-2 border-primary data-[state=checked]:bg-transparent data-[state=checked]:text-primary",
            },
            size: {
                sm: "h-4 w-4",
                md: "h-5 w-5",
                lg: "h-6 w-6",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "md"
        }
    }
)

export interface CheckboxProps
    extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
    accentColor?: string;
}

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>(({ className, variant, size, accentColor, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(checkboxVariants({ variant, size }), className)}
        {...props}
    >
        <CheckboxPrimitive.Indicator
            className={cn("flex items-center justify-center text-current")}
            asChild
        >
            <Motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {variant === "outline" ? (
                    <div className="h-2.5 w-2.5 rounded-sm bg-current" />
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={cn(
                            size === "sm" ? "h-2.5 w-2.5" : size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"
                        )}
                    >
                        <Motion.polyline
                            points="20 6 9 17 4 12"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                        />
                    </svg>
                )}
            </Motion.div>
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
