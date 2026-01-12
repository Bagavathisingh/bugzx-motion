import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Motion } from "@bugzx-motion/core"
import { cn } from "./utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                neon: "bg-black text-cyan-400 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:bg-cyan-950 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:text-cyan-300 transition-all duration-300",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
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
    motion?: "scale" | "fade" | "pop" | "none"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, motion = "none", ...props }, ref) => {
        const motionProps = React.useMemo(() => {
            switch (motion) {
                case "scale":
                    return {
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.95 },
                    };
                case "fade":
                    return {
                        whileHover: { opacity: 0.8 },
                        whileTap: { opacity: 0.6 },
                    };
                case "pop":
                    return {
                        initial: { scale: 0.9 },
                        animate: { scale: 1 },
                        whileHover: { scale: 1.02 },
                    };
                default:
                    return {};
            }
        }, [motion]);

        return (
            <Motion.button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...motionProps}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
