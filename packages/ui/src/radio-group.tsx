'use client';

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Motion } from "@bugzx-motion/core"
import { cn } from "./utils"
import { cva, type VariantProps } from "class-variance-authority"

const radioGroupVariants = cva(
    "aspect-square h-5 w-5 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
    {
        variants: {
            variant: {
                default: "border-primary text-primary",
                neon: "border-cyan-500/50 text-cyan-400 data-[state=checked]:border-cyan-400 data-[state=checked]:shadow-[0_0_10px_rgba(6,182,212,0.4)]",
                minimal: "border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 data-[state=checked]:border-zinc-900 dark:data-[state=checked]:border-zinc-100",
                outline: "border-2 border-primary bg-transparent text-primary",
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

const RadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn("grid gap-2", className)}
            {...props}
            ref={ref}
        />
    )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & VariantProps<typeof radioGroupVariants> & { accentColor?: string }
>(({ className, variant, size, accentColor, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(radioGroupVariants({ variant, size }), className)}
            {...props}
        >
            <RadioGroupPrimitive.Indicator
                className="flex items-center justify-center"
                asChild
            >
                <Motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                    <div className={cn(
                        "rounded-full bg-current",
                        size === "sm" ? "h-2 w-2" : size === "lg" ? "h-3.5 w-3.5" : "h-2.5 w-2.5"
                    )} />
                </Motion.div>
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
